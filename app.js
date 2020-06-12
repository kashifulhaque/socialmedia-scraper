// 3rd party libraries
const express = require("express"); // Express.js. Docs: https://expressjs.com/
const admin = require("firebase-admin"); // Firebase. Docs: https://firebase.google.com/docs
const serviceAccount = require("./firebaseApiKeys.json"); // API keys for the Firebase service account. Read the Firebase docs to know more.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scrape-socialmedia.firebaseio.com",
});
const db = admin.database(); // Reference to the Firebase Realtime Database. Docs: https://firebase.google.com/docs/database

// Initialize Express.js
const app = express();

// A built-in method to recognize incoming requests having JSON data.
app.use(express.json());

// A built-in method to parse the URL parameters.
app.use(
  express.urlencoded({
    extended: true,
  })
);

/* Set up API routes */
const tiktokRoutes = require("./routes/tiktok");
const igRoutes = require("./routes/instagram");

// All "/tiktok" routes will be handled here. See "./routes/tiktok/index.js"
app.use("/tiktok", tiktokRoutes);

// All "/ig" routes will be handled here. See "./routes/instagram/index.js"
app.use("/ig", igRoutes);

// Start the Express server
const port = process.env.PORT || 8100;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Cache data on Firebase Realtime Database
/*const ref = db.ref("tiktok/users/" + username);
const unixTimestamp = Date.now();
const userRef = ref.child(unixTimestamp);
userRef.set(metadata);*/
