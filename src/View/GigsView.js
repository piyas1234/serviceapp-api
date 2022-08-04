const GigsModel = require("../Model/GigsModel");

const GigsPostView = async (req, res, next) => {
  const { title, description, pricing, images } = req.body;
  try {
    const newGigs  = await GigsModel({
      user: req.id,
      title,
      description,
      pricing,
      images,
    });
   await newGigs.save();
    res.status(200).send({ message: "Gigs added Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const GigsGetView = async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data =await GigsModel.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await GigsModel.countDocuments();
    await res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
  }
};

const GigsDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await GigsModel.deleteOne({ _id: ObjectId(id) });
    await res.status(200).send({
      message: "Gig Delete Successfully Done",
      product: gig,
    });
  } catch (err) {
    await res.status(201).send(err);
  }
};

const GigsUpdateView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await GigsModel.updateOne({ _id: ObjectId(id) }, req.body);
    await res.status(200).send(gig);
  } catch (err) {
    await res.status(201).send(err);
  }
};

module.exports = {
  GigsPostView,
  GigsDeleteView,
  GigsGetView,
  GigsUpdateView,
};
