// // const Podcast = require("../models/Podcast");
// const { parseSubscription, parseMeta } = require("../helpers/feedParsing");
// const mongoose = require("mongoose");

// /** Validate MongoDB ObjectId */
// const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// /** Gets all the user's subscriptions. */
// exports.getAllSubscriptions = async (req, res, next) => {
//   try {
//     const subscriptions = await Podcast.find({ _id: { $in: req.user.subscriptions } }).exec();
//     res.status(200).json({ subscriptions });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * Gets a single subscription by its ID.
//  * The parsed feed will be cached for 10 minutes.
//  */
// exports.getSubscription = async (req, res, next) => {
//   if (!isValidObjectId(req.params.id)) {
//     return res.status(400).json({ error: "Invalid subscription ID" });
//   }

//   try {
//     const sub = await Podcast.findById(req.params.id);

//     if (!sub) {
//       return res.status(404).json({ error: `Subscription with ID "${req.params.id}" not found` });
//     }

//     const episodes = await parseSubscription(sub);

//     res.status(200).json({
//       ...sub.toObject(),
//       isSubscribed: req.user.subscriptions.includes(sub._id.toString()),
//       episodes: episodes
//         .map(({ title, audio, date, guid }) => ({ title, audio, date, guid }))
//         .slice(0, parseInt(req.query.limit, 10) || episodes.length),
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * Adds a new subscription for the current user.
//  */
// exports.addSubscription = async (req, res, next) => {
//   try {
//     let podcast = await Podcast.findOne({ feedUrl: req.body.feedUrl });

//     if (podcast) {
//       if (!req.user.subscriptions.includes(podcast._id.toString())) {
//         req.user.subscriptions.push(podcast._id);
//         podcast.subscriberCount += 1;

//         await Promise.all([req.user.save(), podcast.save()]);
//         return res.status(200).json({ result: podcast });
//       } else {
//         return res.status(409).json({ error: "Already subscribed to this feed" });
//       }
//     }

//     const data = await parseMeta(req.body.feedUrl);

//     podcast = new Podcast({
//       ...data,
//       feedUrl: req.body.feedUrl,
//       subscriberCount: 1,
//     });

//     await podcast.save();

//     req.user.subscriptions.push(podcast._id);
//     await req.user.save();

//     res.status(201).json({ result: podcast });
//   } catch (err) {
//     next(err);
//   }
// };

// /**
//  * Removes a feed from the user's subscriptions.
//  */
// exports.deleteSubscription = async (req, res, next) => {
//   if (!isValidObjectId(req.params.id)) {
//     return res.status(400).json({ error: "Invalid subscription ID" });
//   }

//   try {
//     const sub = await Podcast.findById(req.params.id);

//     if (!sub) {
//       return res.status(404).json({ error: `Podcast with ID "${req.params.id}" not found` });
//     }

//     const index = req.user.subscriptions.indexOf(req.params.id);
//     if (index > -1) req.user.subscriptions.splice(index, 1);

//     sub.subscriberCount -= 1;

//     await Promise.all([req.user.save(), sub.save()]);

//     res.status(204).send();
//   } catch (err) {
//     next(err);
//   }
// };

// /** Gets all episodes for a given subscription. */
// exports.getAllEpisodes = async (req, res, next) => {
//   if (!isValidObjectId(req.params.id)) {
//     return res.status(400).json({ error: "Invalid subscription ID" });
//   }

//   try {
//     const sub = await Podcast.findById(req.params.id);

//     if (!sub) {
//       return res.status(404).json({ error: `Subscription with ID "${req.params.id}" not found` });
//     }

//     const episodes = await parseSubscription(sub);
//     const limit = parseInt(req.query.limit, 10) || episodes.length;

//     res.status(200).json({
//       episodes: episodes.slice(0, limit),
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// /** Gets a single episode by its UUID. */
// exports.getEpisode = async (req, res, next) => {
//   if (!isValidObjectId(req.params.id)) {
//     return res.status(400).json({ error: "Invalid subscription ID" });
//   }

//   try {
//     const sub = await Podcast.findById(req.params.id);

//     if (!sub) {
//       return res.status(404).json({ error: `Subscription with ID "${req.params.id}" not found` });
//     }

//     const episodes = await parseSubscription(sub);
//     const result = episodes.find((item) => item.guid === req.params.guid);

//     if (!result) {
//       return res.status(404).json({ error: "Episode not found" });
//     }

//     res.status(200).json({ episode: result });
//   } catch (err) {
//     next(err);
//   }
// };
