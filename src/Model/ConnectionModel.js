const { Schema, default: mongoose } = require("mongoose");

const ConnectionSchema = Schema(
  {
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
);

const ConnectionModel = mongoose.model("Message", ConnectionSchema);

module.exports = ConnectionModel;

// [
//     {
//         id: 1,
//         message: "ghello How are you?"
//     },

// {
//         id: 10,
//         message: "i am fine"
//     },

// {
//         id: 1,
//         message: "what are you doning"
//     },

// {
//         id: 10,
//         message: "nothing man"
//     },

// ]
