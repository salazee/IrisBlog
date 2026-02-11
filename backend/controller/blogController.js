const Post = require("../model/blog.js");
const Like = require("../model/likes.js");

const create = async (req, res) => {
  const { title, content, author } = req.user;
  try {
    if (!title || !content || !author) {
      // ✅ Fixed: Added return to prevent execution after response
      return res.status(400).send({ message: "Invalid Parameters" });
    }
    const newPost = new Post({
      title: title,
      content: content,
      author: req.user.name
    });
    await newPost.save();
    res.status(200).send({ message: "Blog posted successfully", create: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const get = async (req, res) => {
  try {
    const getPost = await Post.find();
    // ✅ Fixed: Removed unnecessary braces - It means the curly braces aare not needed before calling the res status
    // //the likes counter will come in here.

    //   // ✅ Get current user ID (if logged in)
    // const userId = req.user?._id;
    
    // // ✅ Add likes count to each post
    // const postsWithLikes = await Promise.all(
    //   getPost.map(async (post) => {
    //     const likesCount = await Like.countDocuments({ post: post._id });
        
    //     // Check if current user liked this post
    //     const isLikedByCurrentUser = userId 
    //       ? await Like.exists({ post: post._id, user: userId })
    //       : false;
        
    //     return {
    //       ...post.toObject(),
    //       likesCount,
    //       isLikedByCurrentUser: !!isLikedByCurrentUser
    //     };
    //   })
    // );
    
    // res.status(200).send({ 
    //   message: "Posts gotten successfully", 
    //   getpost: postsWithLikes 
    // });
    res.status(200).send({ message: "Post gotten Successfully", getpost: getPost });
  } catch (error) {
    console.error("Failed to get all posts: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const getpostbyid = await Post.findById(id);
    
    if (!getpostbyid) {
      return res.status(404).send({ message: "Post not found" });
    }

    //   // ✅ Add likes count
    // const likesCount = await Like.countDocuments({ post: id });
    
    // // ✅ Check if current user liked this post
    // const userId = req.user?._id;
    // const isLikedByCurrentUser = userId 
    //   ? await Like.exists({ post: id, user: userId })
    //   : false;
    
    // const postWithLikes = {
    //   ...post.toObject(),
    //   likesCount,
    //   isLikedByCurrentUser: !!isLikedByCurrentUser
    // };
    
    // res.status(200).json({ 
    //   message: "Post gotten successfully", 
    //   post: postWithLikes 
    // });
    res.status(200).json({ message: "Post gotten Successfully", post: getpostbyid });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getByAuthor = async (req, res) => {
  try {
    const { author } = req.params;
    const getpostbyauthor = await Post.find({ author: author });
    
    // ✅ Fixed: Check array length properly
    if (getpostbyauthor.length === 0) {
      return res.status(404).send({ message: "No posts found for this author" });
    }
    res.status(200).send({
      message: "Post gotten Successfully",
      lengthOfAuthor: getpostbyauthor.length,
      authorpost: getpostbyauthor
    });
  } catch (error) {
    console.error("Error in getByAuthor:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    // ✅ Fixed: Added { new: true } to return updated document
    const updateBlog = await Post.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true, runValidators: true }
    );

    if (!updateBlog) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      update: updateBlog
    });
  } catch (error) {
    console.error("updatePost error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletepost = await Post.findByIdAndDelete(id);
    
    if (!deletepost) {
      // ✅ Fixed: Added return and changed to 404
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Post deleted Successfully", delete: deletepost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const toggleLike = async (req, res) => {


  try {
  const { postId } = req.params;
  const userId = req.user._id; 

      console.log('toggleLike called');
    console.log('postId:', postId);
    console.log('req.user:', req.user);
    console.log('userId:', req.user?._id);
       // Validate user exists (should always be true if middleware works)
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate postId format (MongoDB ObjectId is 24 hex characters)
    if (!postId || !postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }

    // Check if post exists
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    //to check if there is existing user
    const existingLike = await Like.findOne({ user: userId, post: postId });
    let message;

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      message = "Post unliked";
    } else {
      await Like.create({ user: userId, post: postId });
      message = "Post liked";
    }

    // ✅ Count total likes for this post
    const totalLikes = await Like.countDocuments({ post: postId });

    // ✅ Fixed: Only one response sent
    return res.status(200).json({
      success: true,
      message: message,
      likes: totalLikes,
      isLiked :!existingLike // true if just liked, false if just unliked
    });

  } catch (error) {
    console.error("Likes error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  create,
  toggleLike,
  get,
  getById,
  getByAuthor,
  updatePost,
  deletePost
};