const { default: mongoose } = require("mongoose");
const JobsModel = require("../Model/JobsModel");

const JobsPostView = async (req, res) => {
  try {
    const business = await JobsModel({
      user: mongoose.Types.ObjectId(req.id),
      ...req.body,
    });
    await business.save();
    res
      .status(200)
      .send({ message: "Jobs added Successfully", post: business });
  } catch (error) {
    res.status(201).send({
      message: "error",
      error: error,
    });
  }
};

const JobsGetView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await JobsModel.find({})
      .populate("user")
      .sort("-date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await JobsModel.countDocuments();
    res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {}
};

const JobsGetUserView = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  try {
    const data = await JobsModel.find({ user: mongoose.Types.ObjectId(req.id) })
      .populate("user")
      .sort("date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await JobsModel.find({
      user: mongoose.Types.ObjectId(req.id),
    }).countDocuments();
    res.status(200).send({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {}
};

const JobsGetPublicView = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  try {
    const data = await JobsModel.find({
      user: mongoose.Types.ObjectId(req.params.id),
    })
      .populate("user")
      .sort("date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await JobsModel.find({
      user: mongoose.Types.ObjectId(req.params.id),
    }).countDocuments();
    res.status(200).send({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {}
};

const JobsGetCategoryView = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  try {
    const name = req.params.name;

    const data = await JobsModel.find({ serviceType: { $all: [name] } })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await JobsModel.find({
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

const SingleJobsView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await JobsModel.find({
      _id: mongoose.Types.ObjectId(id),
    }).populate("user");

    res.status(200).send({
      message: "Jobs find Successfully Done",
      data: gig[0],
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const JobsDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await JobsModel.deleteOne({ _id: ObjectId(id) });
    res.status(200).send({
      message: "Jobs Delete Successfully Done",
      product: data,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const JobsUpdateView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await JobsModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
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
  JobsPostView,
  JobsGetView,
  JobsGetUserView,
  JobsGetPublicView,
  JobsGetCategoryView,
  SingleJobsView,
  JobsDeleteView,
  JobsUpdateView,
};
