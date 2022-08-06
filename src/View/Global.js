const GigsModel = require("../Model/GigsModel");
const ServiceModel = require("../Model/ServicesModel");
const UserModel = require("../Model/UserModel");

const getHomeView = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const ServiceData = await ServiceModel.find()
      .limit(limit * 1)
      .exec();

    const gigsData = await GigsModel.find()
      .limit(limit * 1)
      .exec();

    return res.status(200).send({
      data: [
        {
          title: "Popular Services",
          data: ServiceData,
        },

        {
          title: "title",
          data: ServiceData,
        },
        {
          title: "Popular Gigs",
          data: gigsData,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const getSearchView = async (req, res) => {
  try {
    const { keyward, type } = req.query;
    const getSearchData =
       type  === '0'
        ? await ServiceModel.find({ name: { $regex: keyward } })
        : type === '1'
        ?await GigsModel.find({ title: { $regex: keyward } }).populate("user")
        : await UserModel.find({ name: { $regex: keyward } });
    res.status(200).send({
      type,
      data:getSearchData
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
};

module.exports = {
  getHomeView,
  getSearchView,
};


const getSearchServiceView = async (req, res) => {
  try {
    const { keyward, type } = req.query;
    const getSearchData =  await ServiceModel.find({ name: { $regex: keyward } })
         
    res.status(200).send({
      data:getSearchData
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
};

module.exports = {
  getHomeView,
  getSearchView,
  getSearchServiceView
};
