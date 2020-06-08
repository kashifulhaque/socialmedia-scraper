const scraper = require("tiktok-scraper");

// This method fetches the videos for the param "username", default username of "tiktok" will be used if not specified.
module.exports.getUserVideos = async function (
  username = "tiktok",
  count = 10
) {
  try {
    const data = await scraper.user(username, {
      number: count,
      noWaterMark: true,
    });

    return data.collector;
  } catch (err) {
    console.log(err);
  }
};
