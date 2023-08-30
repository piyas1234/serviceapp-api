const { default: mongoose } = require("mongoose");
const AdsModel = require("../Model/AdsModel");
const UserModel = require("../Model/UserModel");

const AdsPostView = async (req, res) => {
  try {
    const ads = await AdsModel({
      user:  new mongoose.Types.ObjectId(req.id),
      ...req.body,
    });
    await ads.save();
    const user = await UserModel.findById(req.id);

    user.ads.push(ads._id);
    await user.save();
    res.status(200).send({ message: "Ads added Successfully", post: ads });
  } catch (error) {
    res.status(201).send({
      message: "error",
      error: error,
    });
  }
};

const AdsGetView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await AdsModel.find({})
      .populate("user")
      .populate("reactions")
      .populate("comments")
      .sort("-date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

      
    const count = await AdsModel.countDocuments();
    res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {}
};

const AdsGetUserView = async (req, res) => {
  const { page = 1, limit = 20 } = req?.query;
  try {
    const data = await AdsModel.find({ user: new  mongoose.Types.ObjectId(req.id) })
    .populate("user")
    .populate("reactions")
    .populate("comments")
    .sort("-date")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
    const count = await AdsModel.find({
      user: new mongoose.Types.ObjectId(req.id),
    }).countDocuments();


    console.log(count)
    res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
};

const AdsGetPublicView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await AdsModel.find({
      user: new mongoose.Types.ObjectId(req.params.id),
    })
    .populate("user")
    .populate("reactions")
    .populate("comments")
    .sort("-date")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
    const count = await AdsModel.find({
      user: new mongoose.Types.ObjectId(req.params.id),
    }).countDocuments();
    res.status(200).send({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {}
};

const AdsGetCategoryView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const name = req.params.name;

    const data = await AdsModel.find({ serviceType: { $all: [name] } })
    
    .populate("user")
    .populate("reactions")
    .populate("comments")
    .sort("-date")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

    const count = await AdsModel.find({
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

const SingleAdsView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await AdsModel.find({
      _id: new mongoose.Types.ObjectId(id),
    }) 
      .populate("user")
      .populate("reactions")
      .populate("comments")
    
    res.status(200).send({
      message: "Ads find Successfully Done",
      data: gig[0],
    });
  } catch (err) {
    res.status(201).send(err);
    console.log(err);
  }
};

const AdsDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await AdsModel.deleteOne({ _id: ObjectId(id) });
    res.status(200).send({
      message: "Ads Delete Successfully Done",
      product: data,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const AdsUpdateView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await AdsModel.updateOne(
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
  AdsPostView,
  AdsGetView,
  AdsGetUserView,
  AdsGetPublicView,
  AdsGetCategoryView,
  SingleAdsView,
  AdsDeleteView,
  AdsUpdateView,
};
