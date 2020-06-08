# tiktok-scraper

A TikTok scraper built using Node.js

### Routes

• `https://murmuring-garden-68870.herokuapp.com/tiktok/user?username=tiktok` will fetch and return the user metadata of the user **tiktok** in JSON format.

• `https://murmuring-garden-68870.herokuapp.com/tiktok/uservideos?username=tiktok&count=10` will fetch and return the 10 videos (starting from the latest one) of the user **tiktok** in JSON format.

• `https://murmuring-garden-68870.herokuapp.com/tiktok/hashtag?tag=tiktok` will fetch and return the metadata of the #hashtag **tiktok** in JSON format.

• `https://murmuring-garden-68870.herokuapp.com/tiktok/trending` will fetch and return the current trending metadata in JSON format.

• `https://murmuring-garden-68870.herokuapp.com/tiktok/video/metadata?url=https://www.tiktok.com/@tiktok/video/6800111723257941253` will fetch and return the metadata of the video URL in JSON format.

• `https://murmuring-garden-68870.herokuapp.com/tiktok/hashtag/metadata?tag=tiktok` will fetch and return the metadata of the #hashtag **tiktok** in JSON format.
