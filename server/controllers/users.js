// const User = require("../models/User");

// // Get a specific user by ID
// exports.getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       const error = new Error("User not found");
//       error.status = 404;
//       throw error;
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };

// // Update the user's email
// exports.updateUser = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       const error = new Error("Email is required");
//       error.status = 400;
//       throw error;
//     }

//     req.user.email = email;

//     const updatedUser = await req.user.save();

//     const { _id, email: updatedEmail, registeredSince, subscriptions } = updatedUser;

//     res.status(200).json({
//       _id,
//       email: updatedEmail,
//       registeredSince,
//       subscriptions,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // Delete a user by ID
// exports.deleteUser = async (req, res, next) => {
//   try {
//     if (req.params.id !== req.user._id.toString()) {
//       const error = new Error("Cannot delete another user's account");
//       error.status = 403;
//       throw error;
//     }

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       const error = new Error("User not found");
//       error.status = 404;
//       throw error;
//     }

//     await user.deleteOne();

//     res.status(204).send();
//   } catch (err) {
//     next(err);
//   }
// };
