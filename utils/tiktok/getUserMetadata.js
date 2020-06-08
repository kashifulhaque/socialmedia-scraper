const { getUserProfileInfo } = require("tiktok-scraper");

/**
 * Get a user's metadata from TikTok. If the username is not specified, it'll fetch metadata for the user ID "tiktok"
 * The second param is a config object. Modify it in app.js file to change the default API response.
 * */
module.exports.getUserMetadata = async function (username = "tiktok", count) {
  try {
    const metadata = await getUserProfileInfo(username, {
      number: count,
      noWaterMark: true,
    });

    return metadata;
  } catch (err) {
    console.log(err);
  }
};
