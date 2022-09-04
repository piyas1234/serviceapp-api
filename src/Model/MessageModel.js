const { Schema, default: mongoose } = require("mongoose");

const MessageSchema = Schema(
  {
    connection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reciver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gigs",
      default:null
    },
    ads: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ads",
      default:null
    },
    jobs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
      default:null
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default:null
    },

    extra: {
      type: Object,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
