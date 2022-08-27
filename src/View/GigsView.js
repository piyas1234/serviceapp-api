const { default: mongoose } = require("mongoose")
const GigsModel = require("../Model/GigsModel")

const GigsPostView = async (req, res) => {
  
  try {
    const {
      title,
      about,
      description,
      pricing,
      images,
      serviceType,
      keyworlds,
    } = req.body

  
    const newGigs = await GigsModel({
      user: mongoose.Types.ObjectId(req.id),
      title,
      about,
      description,
      pricing,
      images,
      serviceType,
      keyworlds,
    })
    await newGigs.save()
    res.status(200).send({ message: "Gigs added Successfully" })
  } catch (error) {
    
    res.status(201).send({
      message: "error",
      error: error,
    })
  }
}

const GigsGetView = async (req, res) => {
  const { page = 1, limit = 20 } = req.query
  try {
    const data = await GigsModel.find({})
      .populate("user").sort("date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

   
    const count = await GigsModel.countDocuments()
    res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (error) {
    
  }
}

const GigsGetUserView = async (req, res) => {
  const { page = 1, limit = 50 } = req.query
  try {
    const data = await GigsModel.find({ user: mongoose.Types.ObjectId(req.id) }).sort("date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()
    const count = await GigsModel.find({
      user: mongoose.Types.ObjectId(req.id),
    }).countDocuments()
    res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (error) {
    
  }
}


const GigsGetPublicView = async (req, res) => {
  const { page = 1, limit = 50 } = req.query
  try {
    const data = await GigsModel.find({ user: mongoose.Types.ObjectId(req.params.id) }).sort("date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()
    const count = await GigsModel.find({
      user: mongoose.Types.ObjectId(req.params.id),
    }).countDocuments()
    res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (error) {
    
  }
}

const GigsGetCategoryView = async (req, res) => {
  const { page = 1, limit = 50 } = req.query
  try {
    const name = req.params.name
    
    const data = await GigsModel.find({ serviceType: { $all: [name] } }).sort("date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await GigsModel.find({
      serviceType: { $all: [name] },
    }).countDocuments()
    res.status(200).send({
      gigs: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (error) {
    
    res.status(201).send({
      error: error,
    })
  }
}

const SingleGigsView = async (req, res) => {
  try {
    const id = req.params.id
    const gig = await GigsModel.find({ _id: mongoose.Types.ObjectId(id) }).populate('user').populate('reviewGig')
    res.status(200).send({
      message: "Gig find Successfully Done",
      data: gig[0],
    })
  } catch (err) {
    res.status(201).send(err)
  }
}

const GigsDeleteView = async (req, res) => {
  try {
    const id = req.params.id
    const gig = await GigsModel.deleteOne({ _id: ObjectId(id) })
    res.status(200).send({
      message: "Gig Delete Successfully Done",
      product: gig,
    })
  } catch (err) {
    res.status(201).send(err)
  }
}

const GigsUpdateView = async (req, res) => {
  const { title, about, description, pricing, images, serviceType, keyworlds } =
    req.body
  try {
    const id = req.params.id
    const gig = await GigsModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        user: req.id,
        title,
        about,
        description,
        pricing,
        images,
        serviceType,
        keyworlds,
      }
    )
    res.status(200).send(gig)
  } catch (err) {
    res.status(201).send(err)
  }
}

module.exports = {
  GigsPostView,
  GigsDeleteView,
  GigsGetView,
  GigsUpdateView,
  SingleGigsView,
  GigsGetUserView,
  GigsGetCategoryView,
  GigsGetPublicView
}
