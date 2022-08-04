const { Schema, default: mongoose } = require("mongoose");

const GigsSchema = Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: [true, "User Id is Required"],
      minlength: 3,
      trim: true,
    },
    description: {
      type: String,
    },
    pricing: {
      type: Object,
      require: true,
    },
    images: {
      type: Array,
      required: true,
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const GigsModel = mongoose.model("Gigs", GigsSchema);

module.exports = GigsModel;
