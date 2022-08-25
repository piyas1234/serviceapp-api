const { Schema, default: mongoose } = require("mongoose");

const CommentsSchema = Schema(
  
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ads:{
      type: mongoose.Schema.Types.ObjectId, ref: "Ads", required: true 
    },
    comment:{
      type:String,
      required: [true, "Comment is Required"],
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CommentsModel = mongoose.model("Comments", CommentsSchema);

module.exports = CommentsModel;
