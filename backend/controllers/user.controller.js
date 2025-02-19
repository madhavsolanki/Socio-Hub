import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import Post from "../models/post.model.js";
import mongoose from "mongoose";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Password encryption
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save to the database
    const newUser = new User({ username, email, password: hashedPassword });
    // Save user to the database
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    // Check if email exists in the database
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Password validation
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Populate each post in the posts array
    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);

        if (post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );

    const responseUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePicture,
      bio: user.bio,
      gender: user.gender,
      followers: user.followers,
      following: user.following,
      posts: populatedPosts,
      bookmarks: user.bookmarks,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
                  message: 'Logged out successfully.',
                  success: true
              });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in Logout User",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "posts",
        createdAt: -1,
      })
      .populate("bookmarks");

      return res.status(200).json({
                  user,
                  success: true})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    // Getting Logged in User ID
    const userId = req.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
    }

    const { bio, gender } = req.body;
    const profilePicture = req.file;

    let cloudResponse;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    if (bio) user.bio = bio;

    if (gender) user.gender = gender;

    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    // Gettting Sugessted Users excluding the logged in user
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );

    if (!suggestedUsers) {
      return res
        .status(404)
        .json({ success: false, message: "No Suggested Users found" });
    }

    return res.status(200).json({ success: true, users: suggestedUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const followKarneWala = req.id; // Ram

    const jiskoFollowKarunga = req.params.id; // Noor Jahan

    if (followKarneWala === jiskoFollowKarunga) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot follow yourself" });
    }

    const user = await User.findById(followKarneWala);
    const targetUser = await User.findById(jiskoFollowKarunga);

    if (!user || !targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Now Check karenge follow karna hai ya unfollow
    const isFollowing = user.following.includes(jiskoFollowKarunga);

    if (isFollowing) {
      // Unfollow logic aaega

      await Promise.all([
        // Update followers and following array in both users
        /*

          Example: if Noor Jahan wants to Unfollow  Ram 

          So here Ram is Logged in user in their computer and Noor Jahan is Loggen in their computer
          Now With This Code

           User.updateOne({_id:followKarneWala}, {$pull: {following: jiskoFollowKarunga}}),
            In the Above code Ram ki following list(array) mein Noor Jahan ko remove karenge

           User.updateOne({_id:jiskoFollowKarunga}, {$pull: {followers: followKarneWala}})
            In the Above code Noor Jahan ki followers list(array) mein Ram ko remove karenge

        */
        User.updateOne(
          { _id: followKarneWala },
          { $pull: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $pull: { followers: followKarneWala } }
        ),
      ]);

      return res.status(200).json({
        success: true,
        message: "User Unfollowed Successfully",
      });
    } else {
      // Follow logic aaega
      await Promise.all([
        // Update followers and following array in both users
        /*

          Example: if Ram want to Follow Noor Jahan
          So here Ram is Logged in user in their computer and Noor Jahan is Loggen in their computer
          Now With This Code

          User.updateOne({_id:followKarneWala}, {$push: {following: jiskoFollowKarunga}}),
            In the Above code Ram ki following list(array) mein Noor Jahan ko add karenge

          User.updateOne({_id:jiskoFollowKarunga}, {$push: {followers: followKarneWala}})
            In the Above code Noor Jahan ki followers list(array) mein Ram ko add karenge

        */
        User.updateOne(
          { _id: followKarneWala },
          { $push: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $push: { followers: followKarneWala } }
        ),
      ]);

      return res.status(200).json({
        success: true,
        message: "User Followed Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


