const scraper = require("tiktok-scraper");

/**
 * Get a user's TikTok videos
 * The first param is the username for which we need to fetch the data. If not specified, it'll fallback to default username of "tiktok".
 * The second param is the number of videos we need in our JSON response. If not specified, it'll fallback to 10 videos.
 * */
module.exports.getUserVideos = async function (
  username = "tiktok",
  count = 10
) {
  try {
    const data = await scraper.user(username, {
      number: count,
      noWaterMark: true,
    });

    if (!data) return null;
    else return data.collector;
  } catch (err) {
    console.log(err);
  }
};
