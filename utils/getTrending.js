const { trend } = require("tiktok-scraper");

// Get "count" number of trending posts from TikTok, optional argument is to fetch videos with watermark
module.exports.getTrending = async function (count = 10, noWatermark = true) {
  try {
    const posts = await trend("", {
      number: count,
      noWatermark: noWatermark,
    });
    return posts.collector;
  } catch (err) {
    console.error(err);
  }
};
