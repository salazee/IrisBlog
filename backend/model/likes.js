const  mongoose =require("mongoose");

const likeSchema = new mongoose.Schema({
    
         user: { type: mongoose.Schema.Types.ObjectId,
             required: [true," User is Required"]
             },
         post: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Post",
             required: [true,"Post is Required" ]},
         createdAt: { 
            type: Date,
             default: Date.now }

    
});

// This prevents a user from liking the same post multiple times and improves query performance

likeSchema.index({user:1, post:1}, {unique:true});
//the mongoose.model must be added so that the model will be added and not the schema. It should be note that the "Like" is from the controller -the const Like
module.exports= mongoose.model("Like", likeSchema)