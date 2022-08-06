const OrderModel = require("../Model/OrderModel");

const OrderPostView = async (req, res) => {
  const { seller, buyer, description, pricing, status } = req.body;
  try {
    const order = await OrderModel({
      seller,
      buyer,
      description,
      pricing,
      status,
    });
    order.save();
    res.status(200).send({ message: "Order send Successfully" });
  } catch (error) {
    res.status(201).send(err);
  }
};

const GetBuyerOrderView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await OrderModel.find({ buyer: ObjectId(req.id) })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await OrderModel.find({
      buyer: ObjectId(req.id),
    }).countDocuments();
    await res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
  }
};

const GetSellerOrderView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const data = await OrderModel.find({ seller: ObjectId(req.id) })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await OrderModel.find({
      buyer: ObjectId(req.id),
    }).countDocuments();
    await res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
  }
};

const SingleBuyerOrderView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await OrderModel.find({ buyer: ObjectId(id) });
    await res.status(200).send({
      message: "Gig find Successfully Done",
      product: gig,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const SingleSellerOrderView = async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await OrderModel.find({ seller: ObjectId(id) });
    await res.status(200).send({
      message: "Gig find Successfully Done",
      product: gig,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const SingleBuyerOrderUpdateView = async (req, res) => {
  try {
    const id = req.id;
    const status = req.params.status;
    const gig = await OrderModel.updateOne(
      { buyer: ObjectId(id) },
      {
        status: status,
      }
    );
    res.status(200).send(gig);
  } catch (err) {
    res.status(201).send(err);
  }
};

module.exports = {
  OrderPostView,
  GetBuyerOrderView,
  GetSellerOrderView,
  SingleBuyerOrderView,
  SingleSellerOrderView,
  SingleBuyerOrderUpdateView,
};
