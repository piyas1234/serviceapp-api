const { Schema, default: mongoose } = require("mongoose")

const ServicesSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required!"],
      minlength: 3,
      trim: true,
    },
    serviceCount: {
      type: Number,
    },

    servicePic: {
      type: String,
      default: 0,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const ServiceModel = mongoose.model("Services", ServicesSchema)


module.exports = ServiceModel
