
const User = require("../model/user");
const Post = require("../model/blog");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

// GET /users/me
const Profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /users/me -> update profile (name, bio, email)
const updateProfile = async (req, res) => {
  try {
    const { name, bio, email, password } = req.body;
    const updates = {};
    
    if (name) updates.name = name;
    if (bio !== undefined) updates.bio = bio;
    
    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      updates.email = email;
    }
    
    // Hash password if provided
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      updates.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id, 
      updates, 
      { new: true, runValidators: true }
    ).select("-password");
    
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already taken" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /users/me/avatar -> upload avatar image
const Avatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove old avatar if present
    if (user.avatar) {
      try {
        const oldPath = path.join(process.cwd(), user.avatar);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      } catch (e) {
        console.error("Error deleting old avatar:", e);
      }
    }

    // Save relative path
    const uploadPath = process.env.AVATAR_UPLOAD_PATH || "uploads/avatars";
    user.avatar = path.join(uploadPath, req.file.filename).replace(/\\/g, '/');
    await user.save();
    
    res.json({ avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// DELETE /users/me -> delete account + posts
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete avatar file
    if (user.avatar) {
      try {
        const avatarPath = path.join(process.cwd(), user.avatar);
        if (fs.existsSync(avatarPath)) {
          fs.unlinkSync(avatarPath);
        }
      } catch (e) {
        console.error("Error deleting avatar:", e);
      }
    }

    // Delete all posts by user
    await Post.deleteMany({ authorId: userId });

    // Delete user (using deleteOne instead of deprecated remove)
    await User.findByIdAndDelete(userId);
    
    res.json({ message: "Account and posts deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { Profile, updateProfile, Avatar, deleteProfile };