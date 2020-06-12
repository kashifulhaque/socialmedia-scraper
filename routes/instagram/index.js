/**
 *
 * Express router. Docs: https://expressjs.com/en/guide/routing.html
 * Read more: https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
 *
 */
const igRoutes = require("express").Router();

// Utils. to scrape data from Instagram
const igUser = require("../../utils/instagram/getUser");

/**
 *
 * All "/ig" endpoints will be resolved here.
 *
 */
// This endpoint will accept a JSON object with username and password and a third optional parameter of count.
// The count param will fetch "count" number of posts of the user.
igRoutes.post("/user", async (req, res) => {
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

// Export the routes
module.exports = igRoutes;
