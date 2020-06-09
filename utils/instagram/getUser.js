const { IgApiClient } = require("instagram-private-api");

// Initialization
const ig = new IgApiClient();

module.exports.getUserPosts = async (username, password, count = 10) => {
  try {
    // A device needs to be generated before it is used. The "username" works as a seed for the generator.
    ig.state.generateDevice(username);
    await ig.simulate.preLoginFlow(); // Simulate an Android app, but on the server side.

    const user = await ig.account.login(username, password);

    process.nextTick(async () => await ig.simulate.postLoginFlow());

    // Fetch the IG feed of the logged in user.
    const feed = ig.feed.user(user.pk);

    let posts = await feed.items();

    return posts;
  } catch (err) {
    return err;
  }
};
