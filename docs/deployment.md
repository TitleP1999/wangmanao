# Deploy to Vercel with Neon

The admin uses Neon Postgres when DATABASE_URL is configured. Local development without DATABASE_URL continues to use data/products.json. Vercel never writes content to local disk.

1. In the existing Vercel project's Storage tab, create/connect a Neon Postgres database through the Marketplace. Select the plan and region appropriate for your account and confirm any provider terms yourself.
2. Connect the database to the project's Production environment. Ensure the injected variable is named DATABASE_URL (no NEXT_PUBLIC_ prefix). For Preview, use a separate database/branch; do not connect preview editors to production data.
3. In Settings > Environment Variables, add ADMIN_PASSWORD and ADMIN_SESSION_SECRET to Production. The session secret must be random and at least 32 characters. The local .env.local file is ignored by Git and is not uploaded automatically.
4. Deploy the updated code, including package-lock.json. Framework: Next.js; Build Command: npm run build; Output Directory: framework default, not out. Use a current Vercel-supported Node.js version (22 or newer).
5. Redeploy after adding/changing environment variables so the running deployment receives them.
6. Open https://your-domain/admin/, sign in, edit and save a product, then check / and /products/ from another browser. Redeploy once more and verify the edit remains.

The wangmanao_content table is created automatically on first database access. Its products row is created on the first save. An empty database displays the initial five categories from src/content/company.ts. The database user needs CREATE TABLE permission for initial setup and SELECT/INSERT/UPDATE for runtime operations. Database errors are not silently replaced with initial content.

Before DATABASE_URL is connected, public pages on Vercel display initial content; admin saves return a configuration error. No save is reported as successful without persistent storage.

Existing local data/products.json is not automatically migrated. If local edits should be transferred, re-enter/save them in the deployed admin; do not commit the data directory or credentials. Product images still use existing /images/... paths or HTTPS URLs, and this version has no file upload.

Use Vercel's firewall/rate-limiting controls for /api/admin/login/ before public use. Admin cookies require HTTPS and expire after eight hours. Backups and recovery are managed through Neon.

Official guides:
- https://vercel.com/docs/postgres
- https://vercel.com/marketplace/neon/neon

## Local or dedicated Node.js server

Copy .env.example to .env.local, configure credentials, then run npm ci, npm run build, npm start. If DATABASE_URL is absent, set CONTENT_DATA_DIR to a persistent writable directory (default: data/). Use one Node.js instance for file storage, preserve and back up that directory, and put an HTTPS reverse proxy in front of the server. Static out/ hosting is not supported.
