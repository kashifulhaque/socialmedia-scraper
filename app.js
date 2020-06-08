// Global constants, modify them accordingly to get different kind of results
const USER_COUNT = 1;
const NO_WATERMARK = true;
const NUMBER_OF_POSTS = 10;
const POST_SCRAPE_COUNT = 5;
const FETCH_VIDEO_IN_HD = true;
const SEARCH_BY_USER_ID = false;
const SAVE_LOCATION = `CURRENT_DIR`;
const SAVE_FILE_TYPE = "json"; // Will fetching the data in JSON here
const RANDOM_UA = false; // TikTok sometimes blocks the User-Agent, setting the value "true" will randomize it.
const scraperOptions = {
  number: NUMBER_OF_POSTS,
  by_user_id: SEARCH_BY_USER_ID,
  asyncScraping: POST_SCRAPE_COUNT,
  filepath: SAVE_LOCATION,
  filetype: SAVE_FILE_TYPE,
  randomUa: RANDOM_UA,
  noWaterMark: NO_WATERMARK,
  hdVideo: FETCH_VIDEO_IN_HD,
};

// 3rd party libraries
const express = require("express");

// Import TikTok utils
const trending = require("./utils/tiktok/getTrending");
const getHashtag = require("./utils/tiktok/getHashtag");
const userVideos = require("./utils/tiktok/getUserVideos");
const userMetadata = require("./utils/tiktok/getUserMetadata");
const videoMetadata = require("./utils/tiktok/getVideoMetadata");
const hashtagMetadata = require("./utils/tiktok/getHashtagMetadata");

// Initialize Express
const app = express();

/* Express app routes */
// TikTok
const tiktokRoute = require("./utils/apiRoutes.json");

/* Set up API routes */
// Sample route: /user?username=tiktok
const routeTikTokUser = tiktokRoute.tiktok + tiktokRoute.tiktokUser;
app.get(routeTikTokUser, async (req, res) => {
  const query = await req.query["username"];
  const metadata = await userMetadata.getUserMetadata(query, USER_COUNT);

  res.json(metadata);
});

// Sample route: /uservideos?username=tiktok&count=10
const routeTikTokUserVideos = tiktokRoute.tiktok + tiktokRoute.tiktokUserVideos;
app.get(routeTikTokUserVideos, async (req, res) => {
  const query = await req.query["username"];
  const count = await req.query["count"];
  const metadata = await userVideos.getUserVideos(query, count);

  res.json(metadata);
});

// Sample route: /hashtag?tag=tiktok
const routeTikTokHashtag = tiktokRoute.tiktok + tiktokRoute.tiktokHashtag;
app.get(routeTikTokHashtag, async (req, res) => {
  /* This route is NOT returning any data as of now */
  const query = await req.query["tag"];
  const hashtagData = await getHashtag.getHashtag(query, scraperOptions);

  res.json(hashtagData);
});

// Sample route: /hashtag/metadata?tag=tiktok
const routeTikTokHashtagMetadata =
  tiktokRoute.tiktok + tiktokRoute.tiktokHashtagMetadata;
app.get(routeTikTokHashtagMetadata, async (req, res) => {
  const query = await req.query["tag"];
  const metadata = await hashtagMetadata.getHashtagMetadata(query);

  res.json(metadata);
});

// Sample route: /trending
const routeTikTokTrending = tiktokRoute.tiktok + tiktokRoute.tiktokTrending;
app.get(routeTikTokTrending, async (req, res) => {
  const metadata = await trending.getTrending(NUMBER_OF_POSTS, NO_WATERMARK);

  res.json(metadata);
});

// Sample route: /video/metadata?url=https://www.tiktok.com/@tiktok/video/6800111723257941253
const routeTikTokVideoMetadata =
  tiktokRoute.tiktok + tiktokRoute.tiktokVideoMetadata;
app.get(routeTikTokVideoMetadata, async (req, res) => {
  const url = await req.query["url"];
  const metadata = await videoMetadata.getVideoMetadata(url);

  res.json(metadata);
});

// Start the Express server
const port = process.env.PORT || 8100;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
