const { getVideoMeta } = require("tiktok-scraper");
const DEMO_TIKTOK_URL =
  "https://www.tiktok.com/@tiktok/video/6800111723257941253";

// This method will fetch the metadata based on a TikTok URL
module.exports.getVideoMetadata = async function (url) {
  if (url == "" || url == null || url.length == 0) {
    return "URL cannot be empty. Demo URL: " + DEMO_TIKTOK_URL;
  } else {
    try {
      const metadata = await getVideoMeta(url, {});
      return metadata;
    } catch (err) {
      console.error(err);
    }
  }
};
