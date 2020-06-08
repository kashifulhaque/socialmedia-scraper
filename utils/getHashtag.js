const { hashtag } = require("tiktok-scraper");

// Get "count" number of videos, based on "tag" #hashtag, optional param is for the video to have no watermark
module.exports.getHashtag = async function (tag = "tiktok", options) {
  try {
    const posts = await hashtag(tag, options);
    return posts;
  } catch (err) {
    console.error(err);
  }
};
