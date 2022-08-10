const { Schema, default: mongoose } = require("mongoose");

const GigsSchema = Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: [true, "Title is Required"],
      minlength: 3,
      trim: true,
    },
    about: {
      type: String,
      required: [true, "Title is Required"],
    },
    description: {
      type: String,
      required: [true, "Title is Required"],
    },
    pricing: {
      type: Object,
      require: true,
      required: [true, "Title is Required"],
    },
    images: {
      type: Array,
      required: true,
      required: [true, "Title is Required"],
    },
    order: [{ type: Schema.Types.ObjectId, ref: "Order" }],

    serviceType: {
      type: Array,
      required: true,
      required: [true, "Service type is Required"],
    },

    keyworlds: {
      type: Array,
      required: true,
      required: [true, "keyworlds is Required"],
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const GigsModel = mongoose.model("Gigs", GigsSchema);

module.exports = GigsModel;
