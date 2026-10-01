# On-premise deployment

1. Use Node.js 20.14 or newer on the build machine; run `npm ci` and `npm run build`.
2. Copy the contents of `out/` to the server's web root.
3. Configure the domain, HTTPS certificate and caching with the company's IT team.
4. Verify `/`, `/about/`, `/products/`, `/partners/` and `/contact/` by direct navigation and refresh.

Example Nginx server block (replace domain, paths and TLS settings):

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/wangmanao;
    index index.html;
    location / { try_files $uri $uri/ =404; }
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    error_page 404 /404.html;
}
```

Static routes use physical directories and index.html; do not configure SPA fallback. Redirect HTTP to HTTPS after IT provisions a certificate. No secrets belong in the static export.

Google Fonts and the Google Maps embed require internet access. Download approved font files and self-host them if the production network blocks Google. Contact links open the user's phone, email or social application; no inquiry is submitted to a custom backend. A future CMS, contact form or commerce flow should be scoped separately and can replace the content module behind an explicit data boundary.
