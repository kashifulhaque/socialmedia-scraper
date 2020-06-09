const { trend } = require("tiktok-scraper");

/**
 * Get trending posts from TikTok. If number of videos is not specified, it'll fetch 10 videos by default.
 * If we need the watermark on the video, we just need to pass "false" as the second param.
 * */
module.exports.getTrending = async function (count = 10, noWatermark = true) {
  try {
    const posts = await trend("", {
      number: count,
      noWatermark: noWatermark,
    });

    if (!posts) return null;
    else return posts.collector;
  } catch (err) {
    console.error(err);
  }
};
