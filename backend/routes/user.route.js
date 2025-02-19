import express from "express";
import {
  followOrUnfollow,
  getSuggestedUsers,
  getUserProfile,
  login,
  logout,
  register,
  updateUserProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(isAuthenticated, logout);

router.route("/:id/profile").get(isAuthenticated, getUserProfile);

router
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePicture"), updateUserProfile);

router.route("/suggested").get(isAuthenticated, getSuggestedUsers);

router.route("/followorunfollow/:id").post(isAuthenticated, followOrUnfollow);

export default router;
