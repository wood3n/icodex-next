const https = require("https");
const fs = require("fs");
const { parseStringPromise } = require("xml2js");

const HOST = "icodex.me"; // 你的域名
const KEY = "dd220fa06c344c4d834684a1186a26f1"; // 你的key

async function submitUrls() {
  // 读取 sitemap
  const xml = fs.readFileSync("./build/sitemap.xml", "utf8");
  const json = await parseStringPromise(xml);
  const urls = json.urlset.url.map((u) => u.loc[0]);

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  });

  console.log("IndexNow payload:", payload);

  const req = https.request(
    {
      hostname: "api.indexnow.org",
      path: "/indexnow",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    },
    (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        console.log("IndexNow response:", res.statusCode, data);
      });
    }
  );

  req.on("error", (err) => console.error(err));
  req.write(payload);
  req.end();
}

submitUrls();
