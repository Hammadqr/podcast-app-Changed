// const fetch = require("node-fetch");
// const User = require("../models/User");

// exports.search = async (req, res, next) => {
//   try {
//     const term = "term=" + req.query.term;
//     const limit = "limit=" + (req.query.limit || 10);

//     // Fetch the user's subscriptions from MongoDB
//     const user = await User.findById(req.user._id).select("subscriptions").populate("subscriptions");

//     if (!user) {
//       const error = new Error("User not found");
//       error.status = 404;
//       throw error;
//     }

//     const feeds = {};
//     user.subscriptions.forEach((sub) => {
//       feeds[sub.feedUrl] = sub._id; // Map feed URLs to subscription IDs
//     });

//     // Search iTunes for podcasts related to the `term` query parameter
//     const response = await fetch(`https://itunes.apple.com/search?${term}&${limit}&entity=podcast`);
//     const data = await response.json();

//     const results = [];
//     const set = new Set();

//     for (const result of data.results) {
//       if (!set.has(result.feedUrl)) {
//         set.add(result.feedUrl);

//         results.push({
//           title: result.collectionName,
//           author: result.artistName,
//           artwork: result.artworkUrl100,
//           feedUrl: result.feedUrl,
//           subscriptionId: feeds[result.feedUrl], // Add subscription ID if it exists
//         });
//       }
//     }

//     res.status(200).json({ results });
//   } catch (err) {
//     next(err);
//   }
// };
