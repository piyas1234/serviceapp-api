const { default: mongoose } = require("mongoose");
const ReactionModel = require("../Model/ReactionModel");

const ReactionPostView = async (req, res) => {
  const { ad_id, react, id } = req.body;
  try {
    const userReact = await ReactionModel.find({
      user: mongoose.Types.ObjectId(req.id),
      ads: mongoose.Types.ObjectId(ad_id),
    });

    console.log(userReact)
    if (userReact.length ===0 ) {
      const data = await ReactionModel({
        react: react,
        user: mongoose.Types.ObjectId(req.id),
        ads: mongoose.Types.ObjectId(ad_id),
      });
      await data.save();
      res.status(200).send(data);
    } else {
      const data = await ReactionModel.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        {
          react: react,
          user: mongoose.Types.ObjectId(req.id),
          ads: mongoose.Types.ObjectId(ad_id),
        }
      );
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(201).send({
      message: "error",
      error: error,
    });
  }
};

const ReactionGetView = async (req, res) => {
 
  const id = req.params.id;
  try {
    const count = await ReactionModel.find({ ads: mongoose.Types.ObjectId(id) }).countDocuments();
      
      const userReact = await ReactionModel.find({
        user: mongoose.Types.ObjectId(req.id),
        ads: mongoose.Types.ObjectId(id),
      }) 
   
    res.status(200).send({
       userReact,
       count
    });
  } catch (error) {}
};

const ReactionDeleteView = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ReactionModel.deleteOne({ _id: ObjectId(id) });
    res.status(200).send({
      message: "Reaction Delete Successfully Done",
      product: data,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

const ReactionUpdateView = async (req, res) => {
  try {
    const { ad_id, react } = req.body;
    const id = req.params.id;
    const data = await ReactionModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        react: react,
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
  ReactionPostView,
  ReactionGetView,
  ReactionDeleteView,
  ReactionUpdateView,
};
