const { default: mongoose } = require("mongoose");
const reviewModel = require("../Model/ReviewModel");
const UserModel = require("../Model/UserModel");

const ReviewrPostView = async (req, res) => {
  const { description, star, reviewGig, reviewReciver } = req.body;
  try {
    const newReview = await reviewModel({
      description,
      star,
      reviewGig: new mongoose.Types.ObjectId(reviewGig),
      reviewReciver: new mongoose.Types.ObjectId(reviewReciver),
      reviewUser: new mongoose.Types.ObjectId(req.id)
    });

    await newReview.save();
    const user = await UserModel.findById(reviewReciver);
    user.reviews.push(newReview._id);
    await user.save();
    res.status(200).send({ message: "Review added Successfully", newReview });
  } catch (error) {}
};

const ReviewsGetGigsView = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const reviewGig = req.params.id;
  try {
    const data = await reviewModel
      .find({ reviewGig: new mongoose.Types.ObjectId(reviewGig) })
      .populate("reviewUser").sort("date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await reviewModel
      .find({ reviewGig: new mongoose.Types.ObjectId(reviewGig) })
      .countDocuments();
    res.status(200).send({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(201).send({
      message: "error",
    });
  }
};

const ReviewsGetUserView = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const reviewUser = req.params.id;
  try {
    const data = await reviewModel
      .find({ reviewUser: new mongoose.Types.ObjectId(reviewUser) }).populate('reviewUser').sort("date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await reviewModel
      .find({ reviewUser: new mongoose.Types.ObjectId(reviewUser) })
      .countDocuments();
    res.status(200).send({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(201).send({
      message: "error",
    });
  }
};

const ReviewsDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await reviewModel.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    res.status(200).send({
      message: "Delete Review Successfully Done",
      data: product,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

module.exports = {
  ReviewrPostView,
  ReviewsDeleteView,
  ReviewsGetGigsView,
  ReviewsGetUserView,
};
