const AdsModel = require("../Model/AdsModel")
const BusinessModel = require("../Model/BusinessModel")
const GigsModel = require("../Model/GigsModel")
const JobsModel = require("../Model/JobsModel")
const ServiceModel = require("../Model/ServicesModel")
const UserModel = require("../Model/UserModel")

const getHomeView = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  try {
    const ServiceData = await ServiceModel.find()
      .limit(limit * 1)
      .exec()

    const gigsData = await GigsModel.find()
      .limit(limit * 1)
      .exec()

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
    })
  } catch (error) {
    
  }
}

const getSearchView = async (req, res) => {
  try {
    const { keyward, type } = req.query
    const getSearchData =
       type  === '0' ? await ServiceModel.find({ name: { $regex: keyward } }) :
        type === '1' ?await GigsModel.find({ title: { $regex: keyward } }).populate("user")  :  
        type==="2" ? await UserModel.find({ name: { $regex: keyward } }):
        type==="3" ? await AdsModel.find({ title: { $regex: keyward } }).populate("user").sort("-date"):
        type==="4" ? await BusinessModel.find({ title: { $regex: keyward } }).populate("user"):
        type==="5" ? await JobsModel.find({ title: { $regex: keyward } }).populate("user"):null



    res.status(200).send({
      type,
      data:getSearchData
    })
  } catch (error) {
    
    res.status(400).send(error)
  }
}

module.exports = {
  getHomeView,
  getSearchView,
}


const getSearchServiceView = async (req, res) => {
  try {
    const { keyward, type } = req.query
    const getSearchData =  await ServiceModel.find({ name: { $regex: keyward } })
         
    res.status(200).send({
      data:getSearchData
    })
  } catch (error) {
    
    res.status(400).send(error)
  }
}

module.exports = {
  getHomeView,
  getSearchView,
  getSearchServiceView
}
