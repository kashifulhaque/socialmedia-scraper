const { getHashtagInfo } = require("tiktok-scraper");

/**
 * Get metadata based on "tag" #hashtag.
 * If "tag" param is not passed in, it will use default "tag" as "tiktok".
 * */
module.exports.getHashtagMetadata = async function (tag = "tiktok") {
  try {
    const metadata = await getHashtagInfo(tag, {});
    return metadata;
  } catch (err) {
    console.error(err);
  }
};
