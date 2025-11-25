const express = require("express");
const {Register, login, getUser} =require("../controller/auth");
const { Profile, updateProfile,Avatar, deleteProfile} = require("../controller/profile");
const upload = require("../Utils/Uploads");
const AuthGateKeeper = require("../middleware/authMiddleware");
const route = express.Router();

route.post('/register', Register);
route.post("/login", login);
route.get("/getUser", getUser);
route.post("/me/avatar", AuthGateKeeper, upload.single("avatar"), Avatar);
route.get("/me", Profile)
route.put("/me",AuthGateKeeper, updateProfile)
route.delete("/me",AuthGateKeeper, deleteProfile)

module.exports=(route);