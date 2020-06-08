const { getHashtagInfo } = require("tiktok-scraper");

module.exports.getHashtagMetadata = async function (tag = "tiktok") {
  if (tag == "" || tag == null) {
    return "Hashtag cannot be empty";
  } else {
    try {
      const metadata = await getHashtagInfo(tag, {});
      return metadata;
    } catch (err) {
      console.error(err);
    }
  }
};
