const mongoose= require("mongoose");
const dotenv = require('dotenv');


dotenv.config();
 const MONGO_URL=process.env.MONGO_URL || "mongodb+srv://salawudeenzainab1_db_user:bmKfEZMvhq1Fmwwd@blogdb.dacvmlt.mongodb.net/"
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL||"")

        console.log(`MongoDB connected Successfully ${MONGO_URL}`)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;