const UserModel = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const client = require("twilio")(
  "ACbd9e34ee50cd672dc9a9dc57c2417306",
  "dda27a5568462ec90799dbb045ffb201",
  {
    lazyLoading: true,
  }
);
dotenv.config();
const saltRounds = 10;

const postUserView = async (req, res, next) => {
  try {
    const { name, phone, password } = req.body;
    const isUser = await UserModel.findOne({ phone: req.body.phone });
    if (isUser) {
      return res.status(201).json({ message: "Phone Number Is In Used" });
    }

    const newUser = new UserModel({
      name,
      phone,
      password,
    });

    const user = await newUser.save();
    var token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30 days", // expires in 24 hours
      }
    );

    return res.status(200).send({
      message: `${user.name} are loggedin successfully!`,
      auth: true,
      token: token,
      role: user.role,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json(error);
  }
};

const postUserProfileView = async (req, res, next) => {
  
  try {
    const { name, bio, about, profilePic, coverPic } = req.body;
    console.log(req.body);
    const id = req.id;
    const profile = await UserModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        name: name,
        profile: {
          bio,
          about,
          profilePic,
          coverPic,
        },
      }
    );
    res.status(200).send(profile);
  } catch (error) {
    console.log(error);
    return res.status(201).json(error);
  }
};

const updateUserProfileView = async (req, res, next) => {
  try {
    const { notification, pushNotification, fingerprint, twofactorAuth } =
      req.body;
    
    const id = req.id;
    const profile = await UserModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        notification,
        pushNotification,
        fingerprint,
        twofactorAuth,
      }
    );
    res.status(200).send(profile);
  } catch (error) {
    console.log(error);
    return res.status(201).json(error);
  }
};

const getUserProfileView = async (req, res, next) => {
  try {
    const profile = await UserModel.find({
      _id: mongoose.Types.ObjectId(req.id),
    });
    console.log(profile);
    res.status(200).send({
      data: profile[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json(error);
  }
};

const getPublicProfileView = async (req, res, next) => {
  try {
    const profile = await UserModel.find({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    console.log(profile);
    res.status(200).send({
      data: profile[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json(error);
  }
};


const getPopularUserProfileView = async (req, res, next) => {
  try {
    const profile = await UserModel.find({});
 
    res.status(200).send({
      data: profile
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json(error);
  }
};

const LoginUserView = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ phone: req.body.phone });

    if (user == null) {
      return res
        .status(201)
        .send({ mesage: "Your have no account with this number" });
    }

    console.log(user);
    var passwordIsValid = req.body.password === user.password;

    if (!passwordIsValid) {
      return res.status(201).send({ mesage: "Your password is wrong!" });
    }

    var token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7 days", // expires in 24 hours
      }
    );

    await res.status(200).send({
      message: `${user.name} are loggedin successfully!`,
      auth: true,
      token: token,
      role: user.role,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(201).send(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ phone: req.query.number });

    if (user == null) {
      return res
        .status(201)
        .send({ mesage: "Your have no account with this number" });
    }

    const securePassword = Math.floor(Math.random() * 100000);

    const updateUser = await UserModel.findOneAndUpdate(
      {
        phone: req.query.number,
      },
      { password: securePassword }
    );
    updateUser.save();

    if (!updateUser) {
      return res.status(201).send({ mesage: "Something is wrong" });
    }

    const data = await client.messages.create({
      from: "12058130587",
      to: `88${req.query.number}`, //this must be a verified phone number for twilio trial accounts
      body: "Your new password is" + securePassword,
    });
    if (data.numSegments === "1") {
      res.status(200).send({
        message:
          "Your new Password Send to " +
          req.query.number +
          "." +
          "You can login now with this password",
      });
    } else {
      return res.status(201).send({ mesage: "Something is wrong" });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  postUserView,
  LoginUserView,
  sendPassword,
  postUserProfileView,
  getUserProfileView,
  updateUserProfileView,
  getPopularUserProfileView
};
