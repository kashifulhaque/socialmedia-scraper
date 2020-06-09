const { hashtag } = require("tiktok-scraper");

/**
 * Get metadata based on "tag" #hashtag.
 * If "tag" param is not passed in, it will use default "tag" as "tiktok".
 * The "options" param is an object which has to be passed and is defined in app.js
 * */
module.exports.getHashtag = async function (tag = "tiktok", options) {
  try {
    const posts = await hashtag(tag, options);

    if (!posts) return null;
    else return posts;
  } catch (err) {
    console.error(err);
  }
};
