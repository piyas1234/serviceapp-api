const { Schema, default: mongoose } = require("mongoose");

const ReactionSchema = Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ads: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ads",
      required: true,
    },
    react: {
      type: String,
      enum: ["like", "love", "smile", "haha", "sad"],
      default: "like",
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ReactionModel = mongoose.model("Reaction", ReactionSchema);

module.exports = ReactionModel;
