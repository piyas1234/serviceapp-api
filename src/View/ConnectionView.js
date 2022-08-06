const ConnectionModel = require("../Model/ConnectionModel");
 
const connectionPostView = async (req, res) => {
  const { connectionId, message } = req.body;
  try {
    const newConnction = await ConnectionModel({
      message,
      user: req.id,
      connectionId,
    });
    await newConnction.save();
    res.status(200).send({ message: "New Connction added Successfully" });
  } catch (error) {
    console.log(error);
  }
};


const connectionPostMessageView = async (req, res) => {
    const message = req.params.message;
    try {
      const newConnction = await ConnectionModel({
        message,
        user: req.id,
        connectionId,
      });
      await newConnction.save();
      res.status(200).send({ message: "New Connction added Successfully" });
    } catch (error) {
      console.log(error);
    }
  };

const GetConnectionView = async (req, res) => {

  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await ConnectionModel.find({_id: ObjectId(req.id)})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await ConnectionModel.find({_id: ObjectId(req.id)}).countDocuments();
      res.status(200).send({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(201).send(err);
  }
};

const SingleConnectionView = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await ConnectionModel.find({ _id: ObjectId(id) });
      res.status(200).send({
      message: "Connection find Successfully Done",
      data: user,
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
  connectionPostMessageView
};
