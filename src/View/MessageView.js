const { default: mongoose } = require("mongoose");
const MessageModel = require("../Model/MessageModel");

const messagePostView = async (req, res) => {
  try {
    const {
      connection,
      message,
      reciver,
      gigId = null,
      extra,
      ads = null,
      jobs = null,
      business = null,
    } = req.body;
    const messages = await MessageModel({
      connection: mongoose.Types.ObjectId(connection),
      message: message,
      sender: mongoose.Types.ObjectId(req.id),
      reciver: mongoose.Types.ObjectId(reciver),
      gigId: mongoose.Types.ObjectId(gigId),
      ads: mongoose.Types.ObjectId(ads),
      jobs: mongoose.Types.ObjectId(jobs),
      business: mongoose.Types.ObjectId(business),
      extra: extra,
    });
    await messages.save();
    res
      .status(200)
      .send({ message: "New Connction added Successfully", messages });
  } catch (error) {}
};

const GetMessageView = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await MessageModel.find({
      connection: mongoose.Types.ObjectId(id),
    })
      .populate("sender")
      .populate("reciver")
      .populate("gigId")
      .populate({
        path: "ads",
        populate: [
          {
            path: "user",
          },
          {
            path: "reactions",
          },
          ,
          {
            path: "comments",
          },
        ],
      })
      .populate({
        path: "jobs",
        populate: [
          {
            path: "user",
          },
          {
            path: "reactions",
          },
          ,
          {
            path: "comments",
          },
        ],
      })
      .populate({
        path: "business",
        populate: [
          {
            path: "user",
          },
          {
            path: "reactions",
          },
          ,
          {
            path: "comments",
          },
        ],
      });

    res.status(200).send({
      data: data,
    });
  } catch (error) {
    res.status(201).send(error);
   
  }
};

const SingleMessageDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await MessageModel.deleteOne({
      _id: mongoose.Types.ObjectId(id),
    });
    res.status(200).send({
      message: "Delete Successfully Done",
      data: del,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

module.exports = {
  messagePostView,
  GetMessageView,
  SingleMessageDeleteView,
};
