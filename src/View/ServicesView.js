const { default: mongoose } = require("mongoose");
const ServiceModel = require("../Model/ServicesModel");

const ServicerPostView = async (req, res) => {
  const { name, servicePic } = req.body;
  try {
    const newService = await ServiceModel({
      name,
      servicePic,
    });
    await newService.save();
    res.status(200).send({ message: "Service added Successfully", newService });
  } catch (error) {
    console.log(error);
  }
};

const ServicesGetView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await ServiceModel.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await ServiceModel.countDocuments();
      res.status(200).send({
      services: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(201).send({
      message:"error"
    })
  }
};

const ServicesDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ServiceModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
      res.status(200).send({
      message: "Delete Service Successfully Done",
      product: product,
    });
  } catch (err) {
      res.status(201).send(err);
  }
};

const ServicesUpdateView = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ServiceModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      req.body
    );
    await res.status(200).send(product);
  } catch (err) {
    await res.status(201).send(err);
  }
};

module.exports = {
  ServicerPostView,
  ServicesDeleteView,
  ServicesGetView,
  ServicesUpdateView,
};
