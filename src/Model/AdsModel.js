const { Schema, default: mongoose } = require("mongoose");

const AdsSchema = Schema(
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
      required: [true, "About is Required"],
    },
    description: {
      type: String,
      required: [true, "description is Required"],
    },
    images: {
      type: Array,
      required: true,
      required: [true, "images is Required"],
    },

    serviceType: {
      type: Array,
      required: true,
      required: [true, "Service type is Required"],
    },
    adress: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    businessEmail: {
      type: String,
    },

    keyworlds: {
      type: Array,
      required: true,
      required: [true, "keyworlds is Required"],
    },
    templateColor:{
        type: String,
    },
    butonText:{
        type: String,
    },
    butonLink:{
        type: String,
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AdsModel = mongoose.model("Ads", AdsSchema);

module.exports = AdsModel;
