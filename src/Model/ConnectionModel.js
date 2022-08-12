const { Schema, default: mongoose } = require("mongoose")

const ConnectionSchema = Schema(
  {

    user: {
      type: mongoose.Schema.Types.Array,
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
      type: Array,
      required: false,
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const ConnectionModel = mongoose.model("Message", ConnectionSchema)

module.exports = ConnectionModel

 
