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

// Import IG utils
const igUser = require("./utils/instagram/getUser");

// Initialize Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Express app routes */
// TikTok
const apiEndpoint = require("./utils/apiRoutes.json");

/* Set up API routes */
// Sample route: /user?username=tiktok
app.get(apiEndpoint.tiktokUser, async (req, res) => {
  const query = await req.query["username"];
  const metadata = await userMetadata.getUserMetadata(query, USER_COUNT);

  if (metadata == null) res.status(404).send(`${query} does not exist.`);
  else res.json(metadata);
});

// Sample route: /uservideos?username=tiktok&count=10
app.get(apiEndpoint.tiktokUserVideos, async (req, res) => {
  const query = await req.query["username"];
  const count = await req.query["count"];
  const metadata = await userVideos.getUserVideos(query, count);

  if (metadata == null) res.status(404).send(`${query} does not exist.`);
  else res.json(metadata);
});

// Sample route: /hashtag?tag=tiktok
app.get(apiEndpoint.tiktokHashtag, async (req, res) => {
  /* This route is NOT returning any data as of now */
  const query = await req.query["tag"];
  const hashtagData = await getHashtag.getHashtag(query, scraperOptions);

  if (hashtagData == null) res.status(404).send(`${query} does not exist.`);
  else res.json(hashtagData);
});

// Sample route: /hashtag/metadata?tag=tiktok
app.get(apiEndpoint.tiktokHashtagMetadata, async (req, res) => {
  const query = await req.query["tag"];
  const metadata = await hashtagMetadata.getHashtagMetadata(query);

  if (metadata == null) res.status(404).send(`${query} does not exist.`);
  else res.json(metadata);
});

// Sample route: /trending
app.get(apiEndpoint.tiktokTrending, async (req, res) => {
  const metadata = await trending.getTrending(NUMBER_OF_POSTS, NO_WATERMARK);

  if (metadata == null) res.status(404).send("Unable to load trending videos.");
  else res.json(metadata);
});

// Sample route: /video/metadata?url=https://www.tiktok.com/@tiktok/video/6800111723257941253
app.get(apiEndpoint.tiktokVideoMetadata, async (req, res) => {
  const url = await req.query["url"];
  const metadata = await videoMetadata.getVideoMetadata(url);

  if (metadata == null)
    res
      .status(404)
      .send(
        `${url} is invalid. Make sure your URL is formatted like this: https://www.tiktok.com/@tiktok/video/6800111723257941253`
      );
  else res.json(metadata);
});

// Sample route: /ig/user
app.post(apiEndpoint.igUser, async (req, res) => {
  const { body } = req;
  if (
    body.username == null ||
    body.username == "" ||
    body.password == null ||
    body.password == ""
  )
    return res.status(400).send("Empty username and/or password");

  const posts = await igUser.getUserPosts(
    body.username,
    body.password,
    body.count
  );
  if (posts != null) res.json(posts);
  else res.status(400);
});

// Start the Express server
const port = process.env.PORT || 8100;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
