const { getUserProfileInfo } = require("tiktok-scraper");

// This method fetches the metadata for the param "username", default username of "tiktok" will be used if not specified.
module.exports.getUserMetadata = async function (username = "tiktok", options) {
  try {
    const metadata = await getUserProfileInfo(username, options);
    return metadata;
  } catch (err) {
    console.log(err);
  }
};
