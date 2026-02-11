const express = require("express");
const{create, get, getById, getByAuthor,updatePost
, deletePost,
toggleLike} = require("../controller/blogController");
const verify = require("../middleware/authMiddleware");
const AuthGateKeeper = require("../middleware/authMiddleware");

const route = express.Router();

route.post("/create",verify, create);
route.get("/get", get);
route.get("/getById/:id" ,getById);
route.get("/getByAuthor/:author", getByAuthor);
route.put("/updatePost/:id" , AuthGateKeeper, updatePost);
route.delete("/deletePost/:id" , AuthGateKeeper, deletePost);
route.post("/toggleLike/:postId", AuthGateKeeper, toggleLike);



module.exports=(route)