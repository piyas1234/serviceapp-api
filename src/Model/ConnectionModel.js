const { Schema, default: mongoose } = require("mongoose");

const ConnectionSchema = Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    sender: { type: Schema.Types.ObjectId, ref: "User" },
    reciver: { type: Schema.Types.ObjectId, ref: "User" },
    message: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: {
      type: String,
      ref: "Messages",
      required: true,
    },
    messageLastTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ConnectionModel = mongoose.model("Connections", ConnectionSchema);

module.exports = ConnectionModel;
