const ConnectionModel = require("../Model/ConnectionModel");

const connectionPostView = async (req, res) => {
  const { reciver, message } = req.body;
  try {
    const newConnction = await ConnectionModel({
      sender: req.id,
      reciver,
    });
    newConnction.message.push(message);
    newConnction.save();
    res.status(200).send({ message: "New Connction added Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const connectionPostMessageView = async (req, res) => {
  const { id, message, reciverId } = req.body;
  try {
    await ConnectionModel.updateOne(
      { _id: ObjectId(id) },
      { $push: { message: message, senderId: req.id, reciverId: reciverId } }
    );
    res.status(200).send({ message: "New Connction added Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const GetConnectionView = async (req, res) => {
  try {
    const reciver = await ConnectionModel.find({ reciver: ObjectId(req.id) });
    const sender = await ConnectionModel.find({ sender: ObjectId(req.id) });
    const newArray = reciver.concat(sender);

    res.status(200).send({
      data: newArray,
    });
  } catch (error) {
    res.status(201).send(err);
  }
};

const SingleConnectionView = async (req, res) => {
  try {
    const id = req.params.id;
    const connection = await ConnectionModel.find({ _id: ObjectId(id) });
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
    const del = await ConnectionModel.deleteOne({ _id: ObjectId(id) });
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
  connectionPostMessageView,
};
