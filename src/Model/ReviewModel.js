const { Schema, default: mongoose } = require("mongoose");

const ReviewSchema = Schema(
  {
    reviewUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewReciver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewGig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gigs",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Title is Required"],
    },
    star: {
      type: Number
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", ReviewSchema);

module.exports = reviewModel;
