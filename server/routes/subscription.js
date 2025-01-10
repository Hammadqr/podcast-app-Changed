// // Import required modules
// const express = require("express");
// const { body, query, param } = require("express-validator");
// const mongoose = require("mongoose");
// const {
//   getAllSubscriptions,
//   getSubscription,
//   addSubscription,
//   deleteSubscription,
//   getAllEpisodes,
//   getEpisode,
// } = require("../controllers/subscriptions");
// const {
//   getCachedSubscription,
//   getCachedEpisodes,
//   getCachedEpisodeByGuid,
// } = require("../middleware/cache");
// const { authenticate } = require("../middleware/passport");
// const isValid = require("../middleware/isValid");
// const { isUserSubscribed } = require("../helpers/validators");

// const router = express.Router();

// // Route to get all subscriptions
// router.get("/", authenticate, async (req, res, next) => {
//   try {
//     const subscriptions = await mongoose.model("Subscription").find({ user: req.user.id });
//     res.json(subscriptions);
//   } catch (error) {
//     next(error);
//   }
// });

// // Route to get a single subscription by ID
// router.get(
//   "/:id",
//   authenticate,
//   [
//     param("id").isMongoId().withMessage("ID is invalid"),
//     query("limit")
//       .isInt({ min: 1 })
//       .withMessage("Limit must be a number greater than zero")
//       .optional(),
//   ],
//   isValid,
//   getCachedSubscription,
//   async (req, res, next) => {
//     try {
//       const subscription = await mongoose.model("Subscription").findById(req.params.id);
//       if (!subscription) return res.status(404).json({ message: "Subscription not found" });
//       res.json(subscription);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // Route to add a new subscription
// router.post(
//   "/",
//   authenticate,
//   [
//     body("feedUrl")
//       .notEmpty()
//       .withMessage("Feed URL cannot be empty")
//       .isURL()
//       .withMessage("Feed URL must be a valid URL"),
//   ],
//   isValid,
//   async (req, res, next) => {
//     try {
//       const Subscription = mongoose.model("Subscription");
//       const subscription = new Subscription({ ...req.body, user: req.user.id });
//       await subscription.save();
//       res.status(201).json(subscription);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // Route to delete a subscription by ID
// router.delete(
//   "/:id",
//   authenticate,
//   [
//     param("id")
//       .isMongoId()
//       .withMessage("ID is invalid")
//       .custom(async (value, { req }) => {
//         const subscription = await mongoose.model("Subscription").findById(value);
//         if (!subscription) throw new Error("Subscription not found");
//         if (subscription.user.toString() !== req.user.id) throw new Error("Unauthorized");
//         return true;
//       }),
//   ],
//   isValid,
//   async (req, res, next) => {
//     try {
//       await mongoose.model("Subscription").findByIdAndDelete(req.params.id);
//       res.status(204).send();
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // Route to get all episodes of a subscription
// router.get(
//   "/:id/episodes",
//   authenticate,
//   [
//     param("id").isMongoId().withMessage("ID is invalid"),
//     query("limit")
//       .isInt({ min: 1 })
//       .withMessage("Limit must be greater than zero")
//       .optional(),
//   ],
//   isValid,
//   getCachedEpisodes,
//   async (req, res, next) => {
//     try {
//       const subscription = await mongoose.model("Subscription").findById(req.params.id);
//       if (!subscription) return res.status(404).json({ message: "Subscription not found" });
//       const episodes = await mongoose.model("Episode").find({ subscription: subscription.id }).limit(req.query.limit);
//       res.json(episodes);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // Route to get a specific episode by GUID
// router.get(
//   "/:id/episodes/:guid",
//   authenticate,
//   [
//     param("id").isMongoId().withMessage("ID is invalid"),
//     param("guid")
//       .notEmpty()
//       .withMessage("GUID cannot be empty")
//       .isString()
//       .withMessage("GUID must be a string"),
//   ],
//   isValid,
//   getCachedEpisodeByGuid,
//   async (req, res, next) => {
//     try {
//       const subscription = await mongoose.model("Subscription").findById(req.params.id);
//       if (!subscription) return res.status(404).json({ message: "Subscription not found" });
//       const episode = await mongoose.model("Episode").findOne({ subscription: subscription.id, guid: req.params.guid });
//       if (!episode) return res.status(404).json({ message: "Episode not found" });
//       res.json(episode);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// module.exports = router;
