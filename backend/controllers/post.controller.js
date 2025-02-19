import Post from "../models/post.model.js";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import  Comment  from "../models/comment.model.js";

// export const addNewPost = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const image = req.file;
//     const authorId = req.id;

//     if (!image) return res.status(400).json({ message: "image required" });

//     // image upload
//     const optimizedImageBuffer = await sharp(image.buffer)
//       .resize({ width: 800, height: 800, fit: "inside" })
//       .toFormat("jpeg", { quality: 80 })
//       .toBuffer();

//     // Buffer to data URI
//     const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
//       "base64"
//     )}`;

//     const cloudResponse = await cloudinary.uploader.upload(fileUri);
//     const post = await Post.create({
//       caption,
//       image: cloudResponse.secure_url,
//       author: authorId,
//     });

//     // Now we have to update the posts array in the user document when posts uploded by logged in user
//     const user = await User.findById(authorId);
//     if (user) {
//       user.posts.push(post._id);
//       await user.save();
//     }

//     await post.populate({ path: "author", select: "-password" });

    
//     return res.status(201).json({
//       message: 'New post added',
//       post,
//       success: true,
//   });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// export const getAllPosts = async (req, res) => {
//   try {
//     // Show Latest Post on Top
//     const posts = await Post.find()
//       .sort({ createdAt: -1 })
//       .populate({ path: "author", select: "username profilePicture" })
//       .populate({
//         path: "comments",
//         sort: { createdAt: -1 },
//         populate: { path: "author", select: "username profilePicture" },
//       });


//       return res.status(200).json({
//         posts,
//         success: true
//     })

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// export const getUserPost = async (req, res) => {
//   try {
    
//     const authorId = req.id;
//     const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 })
//     .populate({ path: "author", select: "username, profilePicture" })
//     .populate({
//       path: "comments",
//       sort: { createdAt: -1 },
//       populate: { path: "author", select: "username, profilePicture" },
//     });

//     return res.status(200).json({
//       posts,
//       success: true
//   })

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// export const likePost = async (req, res) => {
//   try {
    
//     const likeKarneWaleUserKiId = req.id;
//     const postId = req.params.id;
//     const post = await Post.findById(postId); 

//     if(!post) return res.status(404).json({ success: false, message: "Post not found" }); 

//     // Like logic started
//     await post.updateOne({$addToSet: {likes: likeKarneWaleUserKiId}});

//     await post.save();

//     // Implement Socket io for real-time notification

//     return res.status(200).json({message:'Post liked', success:true});

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// }

// export const dislikePost = async (req, res) => {
//   try {
    
//     const likeKarneWaleUserKiId = req.id;
//     const postId = req.params.id;
//     const post = await Post.findById(postId); 

//     if(!post) return res.status(404).json({ success: false, message: "Post not found" }); 

//     // Like logic started
//     await post.updateOne({$pull: {likes: likeKarneWaleUserKiId}});

//     await post.save();

//     // Implement Socket io for real-time notification

//     return res.status(200).json({message:'Post disliked', success:true});

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// export const addComment = async (req, res) => {
//   try {
    
//     const postId = req.params.id;
//     const commentKarneWalaUserKiId = req.id;

//     const {text} = req.body;

//     const post = await Post.findById(postId);
//     if(!post) return res.status(404).json({ success: false, message: "Post not found" });
    
//     if(!text) return res.status(400).json({ success: false, message: "Comment required" });

//     const comment = await Comment.create({
//       text,
//       author: commentKarneWalaUserKiId,
//       post: postId
//     })

//     await comment.populate({ 
//       path: "author", 

//       select: "username profilePicture" 
//     });

//     // Update the Post document with the new comment
//     post.comments.push(comment._id);
//     await post.save();

//     return res.status(201).json({
//       message:'Comment Added',
//       comment,
//       success:true
//   })

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Get All Comments of a Post
// export const getCommentsOfPost = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const comments = await Comment.find({post: postId}).populate({ path: "author", select: "username profilePicture" });

//     if(!comments) return res.status(404).json({ success: false, message: "No comments found for this post" });

//     return res.status(200).json({success:true,comments});

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// }

// export const deletePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const authorId = req.id;

//     const post = await Post.findById(postId);

//     if(!post) return res.status(404).json({ success: false, message: "Post not found" });

//     // Check if the logged-in user is the author of the post
//     if(post.author.toString() !== authorId) return res.status(401).json({ success: false, message: "Unauthorized to delete this post" });

//     // delete the post
//     await Post.findByIdAndDelete(postId);

//     // remove the post id from the user's posts
//     let user = await User.findById(authorId);
//     user.posts.pull(postId);
//     await user.save();

//     // delete associated comments
//     await Comment.deleteMany({ post: postId });

//     return res.status(200).json({
//       success:true,
//       message:'Post deleted'
//   })

//   } catch (error) {
    
//   }
// }

// export const bookmarkPost = async (req, res) => {
//   try {
    
//     const postId = req.params.postId;
//     const authorId = req.id;
//     const post = await Post.findById(postId);
    
//     if(!post) return res.status(404).json({ success: false, message: "Post not found" });
    
//     const user = await User.findById(authorId);
    
//     if(user.bookmarks.includes(post._id)) {
//       // already bookmarked -> remove it from the bookmarks array
//       await user.updateOne({$pull: {bookmarks: post._id}});
//       await user.save();
//       return res.status(200).json({type:'unsaved', message:'Post removed from bookmark', success:true});
//     } 
//     else{
//       // Not bookmarked -> add it to the bookmarks array
//       await user.updateOne({$addToSet: {bookmarks: post._id}});
//       await user.save();
//       return res.status(200).json({type:'saved', message:'Post bookmarked', success:true});
//     }

  


//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// }

// ================================= Source Code =========================

export const addNewPost = async (req, res) => {
  try {
      const { caption } = req.body;
      const image = req.file;
      const authorId = req.id;

      if (!image) return res.status(400).json({ message: 'Image required' });

      // image upload 
      const optimizedImageBuffer = await sharp(image.buffer)
          .resize({ width: 800, height: 800, fit: 'inside' })
          .toFormat('jpeg', { quality: 80 })
          .toBuffer();

      // buffer to data uri
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      const post = await Post.create({
          caption,
          image: cloudResponse.secure_url,
          author: authorId
      });
      const user = await User.findById(authorId);
      if (user) {
          user.posts.push(post._id);
          await user.save();
      }

      await post.populate({ path: 'author', select: '-password' });

      return res.status(201).json({
          message: 'New post added',
          post,
          success: true,
      })

  } catch (error) {
      console.log(error);
  }
}
export const getAllPosts = async (req, res) => {
  try {
      const posts = await Post.find().sort({ createdAt: -1 })
          .populate({ path: 'author', select: 'username profilePicture' })
          .populate({
              path: 'comments',
              sort: { createdAt: -1 },
              populate: {
                  path: 'author',
                  select: 'username profilePicture'
              }
          });
      return res.status(200).json({
          posts,
          success: true
      })
  } catch (error) {
      console.log(error);
  }
};
export const getUserPost = async (req, res) => {
  try {
      const authorId = req.id;
      const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
          path: 'author',
          select: 'username, profilePicture'
      }).populate({
          path: 'comments',
          sort: { createdAt: -1 },
          populate: {
              path: 'author',
              select: 'username, profilePicture'
          }
      });
      return res.status(200).json({
          posts,
          success: true
      })
  } catch (error) {
      console.log(error);
  }
}
export const likePost = async (req, res) => {
  try {
      const likeKrneWalaUserKiId = req.id;
      const postId = req.params.id; 
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: 'Post not found', success: false });

      // like logic started
      await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
      await post.save();

      // implement socket io for real time notification
      const user = await User.findById(likeKrneWalaUserKiId).select('username profilePicture');
       
      const postOwnerId = post.author.toString();
      if(postOwnerId !== likeKrneWalaUserKiId){
          // emit a notification event
          const notification = {
              type:'like',
              userId:likeKrneWalaUserKiId,
              userDetails:user,
              postId,
              message:'Your post was liked'
          }
          const postOwnerSocketId = getReceiverSocketId(postOwnerId);
          io.to(postOwnerSocketId).emit('notification', notification);
      }

      return res.status(200).json({message:'Post liked', success:true});
  } catch (error) {

  }
}
export const dislikePost = async (req, res) => {
  try {
      const likeKrneWalaUserKiId = req.id;
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: 'Post not found', success: false });

      // like logic started
      await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
      await post.save();

      // implement socket io for real time notification
      const user = await User.findById(likeKrneWalaUserKiId).select('username profilePicture');
      const postOwnerId = post.author.toString();
      if(postOwnerId !== likeKrneWalaUserKiId){
          // emit a notification event
          const notification = {
              type:'dislike',
              userId:likeKrneWalaUserKiId,
              userDetails:user,
              postId,
              message:'Your post was liked'
          }
          const postOwnerSocketId = getReceiverSocketId(postOwnerId);
          io.to(postOwnerSocketId).emit('notification', notification);
      }



      return res.status(200).json({message:'Post disliked', success:true});
  } catch (error) {

  }
}
export const addComment = async (req,res) =>{
  try {
      const postId = req.params.id;
      const commentKrneWalaUserKiId = req.id;

      const {text} = req.body;

      const post = await Post.findById(postId);

      if(!text) return res.status(400).json({message:'text is required', success:false});

      const comment = await Comment.create({
          text,
          author:commentKrneWalaUserKiId,
          post:postId
      })

      await comment.populate({
          path:'author',
          select:"username profilePicture"
      });
      
      post.comments.push(comment._id);
      await post.save();

      return res.status(201).json({
          message:'Comment Added',
          comment,
          success:true
      })

  } catch (error) {
      console.log(error);
  }
};
export const getCommentsOfPost = async (req,res) => {
  try {
      const postId = req.params.id;

      const comments = await Comment.find({post:postId}).populate('author', 'username profilePicture');

      if(!comments) return res.status(404).json({message:'No comments found for this post', success:false});

      return res.status(200).json({success:true,comments});

  } catch (error) {
      console.log(error);
  }
}
export const deletePost = async (req,res) => {
  try {
      const postId = req.params.id;
      const authorId = req.id;

      const post = await Post.findById(postId);
      if(!post) return res.status(404).json({message:'Post not found', success:false});

      // check if the logged-in user is the owner of the post
      if(post.author.toString() !== authorId) return res.status(403).json({message:'Unauthorized'});

      // delete post
      await Post.findByIdAndDelete(postId);

      // remove the post id from the user's post
      let user = await User.findById(authorId);
      user.posts = user.posts.filter(id => id.toString() !== postId);
      await user.save();

      // delete associated comments
      await Comment.deleteMany({post:postId});

      return res.status(200).json({
          success:true,
          message:'Post deleted'
      })

  } catch (error) {
      console.log(error);
  }
}
export const bookmarkPost = async (req,res) => {
  try {
      const postId = req.params.id;
      const authorId = req.id;
      const post = await Post.findById(postId);
      if(!post) return res.status(404).json({message:'Post not found', success:false});
      
      const user = await User.findById(authorId);
      if(user.bookmarks.includes(post._id)){
          // already bookmarked -> remove from the bookmark
          await user.updateOne({$pull:{bookmarks:post._id}});
          await user.save();
          return res.status(200).json({type:'unsaved', message:'Post removed from bookmark', success:true});

      }else{
          // bookmark krna pdega
          await user.updateOne({$addToSet:{bookmarks:post._id}});
          await user.save();
          return res.status(200).json({type:'saved', message:'Post bookmarked', success:true});
      }

  } catch (error) {
      console.log(error);
  }
}