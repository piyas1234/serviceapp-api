const { default: mongoose } = require("mongoose");
const BusinessModel = require("../Model/BusinessModel");
const UserModel = require("../Model/UserModel");

const BusinessPostView = async (req, res) => {
  try {
    const business = await BusinessModel({
      user: new mongoose.Types.ObjectId(req.id),
      ...req.body,
    });
    await business.save();
    const user = await UserModel.findById(req.id);
    user.business.push(business._id);
    await user.save();

    res
      .status(200)
      .send({ message: "Business added Successfully", post: business });
  } catch (error) {
    res.status(201).send({
      message: "error",
      error: error,
    });
  }
};

const BusinessGetView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await BusinessModel.find({})
      .populate("user")
      .populate("reactions")
      .populate("comments")
      .sort("-date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await BusinessModel.countDocuments();
    res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {}
};

const BusinessGetUserView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await BusinessModel.find({
      user: new mongoose.Types.ObjectId(req.id),
    })
      .populate("user")
      .populate("reactions")
      .populate("comments")
      .sort("-date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await BusinessModel.find({
      user: new mongoose.Types.ObjectId(req.id),
    }).countDocuments();
    res.status(200).send({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {}
};

const BusinessGetPublicView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await BusinessModel.find({
      user: new mongoose.Types.ObjectId(req.params.id),
    })
      .populate("user")
      .populate("reactions")
      .populate("comments")
      .sort("-date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await BusinessModel.find({
      user: new mongoose.Types.ObjectId(req.params.id),
    }).countDocuments();
    res.status(200).send({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {}
};

const BusinessGetCategoryView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const name = req.params.name;

    const data = await BusinessModel.find({ serviceType: { $all: [name] } })
      .populate("user")
      .populate("reactions")
      .populate("comments")
      .sort("-date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await BusinessModel.find({
      serviceType: { $all: [name] },
    }).countDocuments();
    res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(201).send({
      error: error,
    });
  }
};

const SingleBusinessView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await BusinessModel.find({
      _id: new mongoose.Types.ObjectId(id),
    })

      .populate("user")
      .populate("reactions")
      .populate("comments");

    res.status(200).send({
      message: "Business find Successfully Done",
      data: gig[0],
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const BusinessDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BusinessModel.deleteOne({ _id: ObjectId(id) });
    res.status(200).send({
      message: "Business Delete Successfully Done",
      product: data,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const BusinessUpdateView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await BusinessModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        user: req.id,
        ...req.body,
      }
    );
    res.status(200).send(gig);
  } catch (err) {
    res.status(201).send(err);
  }
};

module.exports = {
  BusinessPostView,
  BusinessGetView,
  BusinessGetUserView,
  BusinessGetPublicView,
  BusinessGetCategoryView,
  SingleBusinessView,
  BusinessDeleteView,
  BusinessUpdateView,
};
