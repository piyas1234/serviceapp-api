const { default: mongoose } = require("mongoose");
const CommentsModel = require("../Model/CommentsModel");

const CommentsPostView = async (req, res) => {
  const { ad_id, comment } = req.body;
  try {
    const Comments = await CommentsModel({
        comment: comment,
      user: mongoose.Types.ObjectId(req.id),
      ads: mongoose.Types.ObjectId(ad_id),
    });
    await Comments.save();
    res.status(200).send({ message: "Comments added Successfully" });
  } catch (error) {
    res.status(201).send({
      message: "error",
      error: error,
    });
  }
};

const CommentsGetView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const id = req.params.id
  try {
    const data = await CommentsModel.find({ads: mongoose.Types.ObjectId(id)})
      .populate("user")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await CommentsModel.find({ads: mongoose.Types.ObjectId(id)}).countDocuments();
    res.status(200).send({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {}
};

const CommentsGetCountView = async (req, res) => {
  const id = req.params.id
  try {
    const count = await CommentsModel.find({ads: mongoose.Types.ObjectId(id)}).countDocuments();
    res.status(200).send({
      data: count
    });
  } catch (error) {}
};

const CommentsDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CommentsModel.deleteOne({ _id: ObjectId(id) });
    res.status(200).send({
      message: "Comments Delete Successfully Done",
      product: data,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const CommentsUpdateView = async (req, res) => {
  try {
    const { ad_id, comment } = req.body;
    const id = req.params.id;
    const data = await CommentsModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        comment: comment,
        user: mongoose.Types.ObjectId(req.id),
        ads: mongoose.Types.ObjectId(ad_id),
      }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(201).send(err);
  }
};

module.exports = {
  CommentsPostView,
  CommentsGetView,
  CommentsDeleteView,
  CommentsUpdateView,
  CommentsGetCountView
};
