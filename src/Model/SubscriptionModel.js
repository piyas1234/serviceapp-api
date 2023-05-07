const { Schema, default: mongoose } = require("mongoose")

const SubscriptionSchema = Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: [true, "Title is Required"],
      minlength: 3,
      trim: true,
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema)

module.exports = SubscriptionModel
