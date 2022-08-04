const express = require("express");
const { postUserView, LoginUserView, sendPassword } = require("../View/UserView");



const userRouter = express();
userRouter.post("/signup", postUserView)
userRouter.post("/login", LoginUserView)
userRouter.get("/sendpassword", sendPassword)

module.exports =  userRouter;