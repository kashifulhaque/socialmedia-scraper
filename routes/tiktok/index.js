/**
 *
 * Express router. Docs: https://expressjs.com/en/guide/routing.html
 * Read more: https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
 *
 */
const tiktokRoutes = require("express").Router();

// Global constants
const USER_COUNT = 1;
const NO_WATERMARK = true;

// Utils. to scrape data from TikTok
const trending = require("../../utils/tiktok/getTrending");
const getHashtag = require("../../utils/tiktok/getHashtag");
const userVideos = require("../../utils/tiktok/getUserVideos");
const userMetadata = require("../../utils/tiktok/getUserMetadata");
const videoMetadata = require("../../utils/tiktok/getVideoMetadata");
const hashtagMetadata = require("../../utils/tiktok/getHashtagMetadata");

/**
 *
 * All "/tiktok" endpoints will be resolved here.
 *
 */
// Route: /user?username=tiktok
// If a username is not specified, it will fallback to default username "tiktok"
tiktokRoutes.get("/user", async (req, res) => {
  const username = await req.query["username"];
  let metadata = await userMetadata.getUserMetadata(username, USER_COUNT);

  metadata = JSON.parse(
    JSON.stringify(metadata, function (key, value) {
      if (value === undefined) return "";
      return value;
    })
  );

  if (metadata == null) res.status(404).send(`${username} does not exist.`);
  else res.json(metadata);
});

// Route: /uservideos?username=tiktok&count=10
// If a username is not specified, it will fallback to default username "tiktok".
// Same applies to the count too, if not specified, it will fetch 10 videos by default.
tiktokRoutes.get("/uservideos", async (req, res) => {
  const username = await req.query["username"];
  const count = await req.query["count"];
  let metadata = await userVideos.getUserVideos(username, count);

  metadata = JSON.parse(
    JSON.stringify(metadata, function (key, value) {
      if (value === undefined) return "";
      return value;
    })
  );

  if (metadata == null) res.status(404).send(`${username} does not exist.`);
  else res.json(metadata);
});

// Route: /trending?count=15
// If "count" is not specified, it will fetch 10 videos by default.
tiktokRoutes.get("/trending", async (req, res) => {
  const count = await req.query["count"];
  let metadata = await trending.getTrending(count, NO_WATERMARK);

  metadata = JSON.parse(
    JSON.stringify(metadata, function (key, value) {
      if (value === undefined) return "";
      return value;
    })
  );

  if (metadata == null) res.status(404).send("Unable to load trending videos.");
  else res.json(metadata);
});

// Sample route: /hashtag?tag=tiktok
// If "tag" param is not specified, it'll fetch the data of #tiktok
tiktokRoutes.get("/hashtag", async (req, res) => {
  const hashtag = await req.query["tag"];
  let metadata = await hashtagMetadata.getHashtagMetadata(hashtag);

  metadata = JSON.parse(
    JSON.stringify(metadata, function (key, value) {
      if (value === undefined) return "";
      return value;
    })
  );

  if (metadata == null) res.status(404).send(`${tag} does not exist.`);
  else res.json(metadata);
});

// Route: /video/metadata?url=https://www.tiktok.com/@tiktok/video/6800111723257941253
// Get the metadata of any tiktok video by passing in the url as the param.
// If the url param is not specified, It'll use https://www.tiktok.com/@tiktok/video/6800111723257941253 as the default video.
tiktokRoutes.get("/video/metadata", async (req, res) => {
  const url = await req.query["url"];
  let metadata = await videoMetadata.getVideoMetadata(url);

  metadata = JSON.parse(
    JSON.stringify(metadata, function (key, value) {
      if (value === undefined) return "";
      return value;
    })
  );

  if (metadata == null)
    res
      .status(404)
      .send(
        `${url} is invalid. Make sure your URL is formatted like this: https://www.tiktok.com/@tiktok/video/6800111723257941253`
      );
  else res.json(metadata);
});

// Export the routes
module.exports = tiktokRoutes;
