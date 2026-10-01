// Retrieve original-size company assets; never enlarge thumbnails in the pipeline.
const fs = require("node:fs/promises");
const sharp = require("sharp");
const base = "https://itp1.itopfile.com/ImageServer/608bd09167383aec/0/0/";
const files = {
  "corn.png": base + "cornz-z418543249635.png",
  "livestock.png":
    "https://www.wangmanao.com/Files/Name/CONTENT318443765472.png",
  "aquatic.png": "https://www.wangmanao.com/Files/Name/CONTENT778562698983.png",
  "pet.png": "https://www.wangmanao.com/Files/Name/CONTENT980603876212.png",
  "rice.png": "https://www.wangmanao.com/Files/Name/CONTENT599471145388.png",
  "managing-director.jpg":
    base + encodeURIComponent("รูปเฮียสูท") + "z-z412266831504.jpg",
  "cpf.png": base + "cpfz-z1369182394526.png",
  "betagro.png": base + "betagroz-z219844342295.png",
  "thaifoods.png": base + "thaifoodz-z958597930427.png",
  "mars.png": base + "marsz-z794440122051.png",
  "bokdok.png": base + "bokdokz-z443724891499.png",
  "chat-rice.jpg": base + encodeURIComponent("ฉัตร") + "z-z353517704809.jpg",
  "thai-thai.jpg": base + encodeURIComponent("ไทไท") + "z-z92578505610.jpg",
  "bee.png": base + encodeURIComponent("ผึ้ง") + "z-z823864393330.png",
  "cook.png": base + encodeURIComponent("กุ๊ก") + "z-z423546829387.png",
  "grape.png": base + encodeURIComponent("องุ่น") + "z-z771770754148.png",
  "king-rice.png": base + "kingricez-z615540964729.png",
  "tvo.png": "https://www.wangmanao.com/Files/Name/CONTENT775369758882.png",
  "thanakorn.png":
    "https://www.wangmanao.com/Files/Name/CONTENT763624457307.png",
  "pcg.png": "https://www.wangmanao.com/Files/Name/CONTENT221051921920.png",
};
(async () => {
  const results = await Promise.allSettled(
    Object.entries(files).map(async ([name, url]) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
      const data = Buffer.from(await response.arrayBuffer());
      const next = await sharp(data).metadata();
      const path = `public/images/${name}`;
      const previous = await sharp(path).metadata();
      if (next.width > previous.width || next.height > previous.height) {
        await fs.writeFile(path, data);
        return `${name}: ${previous.width}x${previous.height} -> ${next.width}x${next.height}`;
      }
      return `${name}: original remains ${previous.width}x${previous.height}`;
    }),
  );
  for (const result of results)
    console.log(
      result.status === "fulfilled" ? result.value : result.reason.message,
    );
})();
