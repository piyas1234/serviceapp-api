const { Schema, default: mongoose } = require("mongoose");

const JobsSchema = Schema(
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
    adress:{
        type: String,
        required: [true, "Adress is Required"],
    },

    slarayRange:{
        type:Array
    },
    contactNo: {
        type: Array,
      },
      businessEmail: {
        type: Array,
      },

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

const JobsModel = mongoose.model("Jobs", JobsSchema);

module.exports = JobsModel;