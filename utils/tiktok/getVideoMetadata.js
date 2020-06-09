const { getVideoMeta } = require("tiktok-scraper");
const DEMO_TIKTOK_URL =
  "https://www.tiktok.com/@tiktok/video/6800111723257941253";

/**
 * Get the metadata of a video based on its URL.
 * It will return a JSON object containing the metadata for the given URL.
 * */
module.exports.getVideoMetadata = async function (url) {
  if (url == "" || url == null || url.length == 0) {
    return "URL cannot be empty. Demo URL: " + DEMO_TIKTOK_URL;
  } else {
    try {
      const metadata = await getVideoMeta(url, {});

      if (!metadata) return null;
      else return metadata;
    } catch (err) {
      console.error(err);
    }
  }
};
