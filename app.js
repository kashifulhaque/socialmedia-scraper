// Global constants, modify them accordingly to get different kind of results
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

// Express app routes
const routeUserData = "/user";
const routeHashtag = "/hashtag";
const routeTrending = "/trending";
const routeVideoMetadata = "/video/metadata";
const routeHashtagMetadata = "/hashtag/metadata";

// 3rd party libraries
const express = require("express");

// Import utils
const trending = require("./utils/getTrending");
const getHashtag = require("./utils/getHashtag");
const userMetadata = require("./utils/getUserMetadata");
const videoMetadata = require("./utils/getVideoMetadata");
const hashtagMetadata = require("./utils/getHashtagMetadata");

// Initialize Express
const app = express();

// Set up API routes
app.get(routeUserData, async (req, res) => {
  const query = await req.query["username"];
  const metadata = await userMetadata.getUserMetadata(query, scraperOptions);

  res.json(metadata);
});

app.get(routeHashtag, async (req, res) => {
  /* This route is NOT returning any data as of now */
  const query = await req.query["tag"];
  const hashtagData = await getHashtag.getHashtag(query, scraperOptions);

  res.json(hashtagData);
});

app.get(routeHashtagMetadata, async (req, res) => {
  const query = await req.query["tag"];
  const metadata = await hashtagMetadata.getHashtagMetadata(query);

  res.json(metadata);
});

app.get(routeTrending, async (req, res) => {
  const metadata = await trending.getTrending(NUMBER_OF_POSTS, NO_WATERMARK);

  res.json(metadata);
});

app.get(routeVideoMetadata, async (req, res) => {
  const url = await req.query["url"];
  const metadata = await videoMetadata.getVideoMetadata(url);

  res.json(metadata);
});

// Start the Express server
const port = process.env.PORT || 8100;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
