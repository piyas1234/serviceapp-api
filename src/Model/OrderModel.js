const { Schema, default: mongoose } = require("mongoose");

const OrderSchema = Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gigs",
      required: true,
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
    status: {
      type: String,
      enum: ["order", "delivired", "pending", "canceled"],
      default: "order",
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
