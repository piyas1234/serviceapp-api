const { default: mongoose } = require("mongoose")
const AdsModel = require("../Model/AdsModel")
const BusinessModel = require("../Model/BusinessModel")
const ConnectionModel = require("../Model/ConnectionModel")
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



const getAllDataForInitialPages= async ( req , res )=>{
  const { page = 1, limit = 20 } = req.query;
  try {
    const adsdata = await AdsModel.find({})
      .populate("user")
      .populate("reactions")
      .populate("comments")
      .sort("-date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

      const businessdata = await BusinessModel.find({})
      .populate("user")
      .populate("reactions")
      .populate("comments")
      .sort("-date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

      const gigsdata = await GigsModel.find({}).sort("-updatedAt")
      .populate("user") 
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

      const jobsdata = await JobsModel.find({})
      .populate("reactions")
      .populate("comments")
      .populate("user")
      .sort("-date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

      const serviceprovider = await UserModel.find({}).limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

      const connectiondata = await ConnectionModel.find({
        users: { $all: [new mongoose.Types.ObjectId(req.id)] },
      })
        .populate("users")
        .sort("-updatedAt");


        const servicedata = await ServiceModel.find({}).sort("date")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()

        const profile = await UserModel.find({
          _id: new mongoose.Types.ObjectId(req.id),
        });



     const ads = await AdsModel.countDocuments() 
     const adsCount =  Math.ceil(ads / limit);

     const business = await BusinessModel.countDocuments() 
     const businessCount  =  Math.ceil(business / limit);

     const gigs  = await GigsModel.countDocuments() 
     const gigsCount  =  Math.ceil(gigs / limit);

     const jobs  = await JobsModel.countDocuments() 
     const jobsCount   =  Math.ceil(jobs / limit);

     


    
    res.status(200).send({
      adsdata: adsdata,
      businessdata: businessdata,
      gigsdata:gigsdata,
      jobsdata:jobsdata,
      connectiondata: connectiondata,
      servicedata:servicedata,
      serviceprovider:serviceprovider,
      profile:profile[0],
      adsCount:adsCount,
      jobsCount:jobsCount,
      businessCount:businessCount,
      gigsCount:gigsCount 

      
    });
  }
   catch (error) {
    res.status(400).send(error)
    
  }
}

module.exports = {
  getHomeView,
  getSearchView,
  getSearchServiceView,
  getAllDataForInitialPages
}
