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

app.use(cors({
     origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet());



app.use("/post", blogRoute);
app.use("/auth", AuthRoute);

// serve uploads (avatars)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Iris Blog API',
    timestamp: new Date().toISOString()
  });
});
// Add this AFTER your API routes, BEFORE error handlers
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/blog/dist')));
  
  
}
connectDB();

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
});
