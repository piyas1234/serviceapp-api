const { default: mongoose, connection } = require("mongoose");
const ConnectionModel = require("../Model/ConnectionModel");

const connectionPostView = async (req, res) => {
  try {
    const { reciver, message } = req.body;
    const connection = await ConnectionModel.findOne({
      reciver: reciver,
      sender: req.id,
    });

    const connection2 = await ConnectionModel.findOne({
      reciver: req.id,
      sender: reciver,
    });

    if (connection) {
      await ConnectionModel.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(connection) },
        {
          lastMessage: message,
        }
      );
      return res
        .status(200)
        .send({ message: "Aleary connected", newConnction: connection });
    }

    if (connection2) {
      await ConnectionModel.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(connection2) },
        {
          lastMessage: message,
        }
      );
      return res
        .status(200)
        .send({ message: "Aleary connected", newConnction: connection2 });
    }

    const newConnction = await ConnectionModel({
      users: [
        new mongoose.Types.ObjectId(reciver),
        new mongoose.Types.ObjectId(req.id),
      ],
      sender: req.id,
      reciver: reciver,
      lastMessage: message,
    });
    await newConnction.save();
    res
      .status(200)
      .send({ message: "New Connction added Successfully", newConnction });
  } catch (error) {
    console.log(error);
  }
};

const GetConnectionView = async (req, res) => {
  try {
    const data = await ConnectionModel.find({
      users: { $all: [new mongoose.Types.ObjectId(req.id)] },
    })
      .populate("users")
      .sort("-updatedAt");

    res.status(200).send({
      data: data,
    });
  } catch (error) {
    res.status(201).send(error);
  }
};

const SingleConnectionView = async (req, res) => {
  try {
    const id = req.params.id;
    const connection = await ConnectionModel.find({
      _id: new mongoose.Types.ObjectId(id),
    }).populate("messages");
    res.status(200).send({
      message: "Connection find Successfully Done",
      data: connection,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const SingleConnectionDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await ConnectionModel.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
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
  SingleConnectionDeleteView,
  connectionPostView,
  SingleConnectionView,
  GetConnectionView,
};
