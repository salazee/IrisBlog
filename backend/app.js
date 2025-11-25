const express =require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const blogRoute = require("./route/blog");
const cors =require("cors");
const helmet = require("helmet");
const AuthRoute = require("./route/user");
const path= require("path")
// const bcrypt = require('bcrypt')
dotenv.config();


const PORT =process.env.PORT;


const app= express();
app.use(express.json());

app.use(cors());

app.use(helmet());



app.use("/post", blogRoute);
app.use("/auth", AuthRoute);

// serve uploads (avatars)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


connectDB();

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
});
