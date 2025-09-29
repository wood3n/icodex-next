const https = require("https");
const fs = require("fs");
const { parseStringPromise } = require("xml2js");

const HOST = "icodex.me"; // 你的域名
const KEY = "dd220fa06c344c4d834684a1186a26f1"; // 你的key
const KEY_FILE_URL = `https://${HOST}/${KEY}.txt`;

async function submitUrls() {
  // 读取 sitemap
  const xml = fs.readFileSync("./build/sitemap.xml", "utf8");
  const json = await parseStringPromise(xml);
  let urls = json.urlset.url.map((u) => u.loc[0].trim());

  // 只保留与 HOST 完全匹配的链接，并去重
  const seen = new Set();
  urls = urls.filter((u) => {
    try {
      const urlObj = new URL(u);
      const valid = urlObj.hostname === HOST;
      if (!valid) return false;
      if (seen.has(u)) return false;
      seen.add(u);
      return true;
    } catch (e) {
      return false;
    }
  });

  if (!urls.length) {
    console.error(
      "sitemap 中没有匹配到域名的 URL，请检查 build/sitemap.xml 和 HOST 配置。"
    );
    return;
  }

  // IndexNow 每次最多 10000 条，超过则截断
  if (urls.length > 10000) {
    console.warn(`URL 数量(${urls.length})超过 10000，已自动截断。`);
    urls = urls.slice(0, 10000);
  }

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_FILE_URL,
    urlList: urls,
  });

  console.log("IndexNow payload:", payload);

  const req = https.request(
    {
      hostname: "api.indexnow.org",
      port: 443,
      path: "/indexnow",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(payload),
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

  req.setTimeout(15000, () => {
    console.error("请求超时，已中止。");
    req.destroy(new Error("timeout"));
  });

  req.on("error", (err) => console.error(err));
  req.write(payload);
  req.end();
}

submitUrls();
