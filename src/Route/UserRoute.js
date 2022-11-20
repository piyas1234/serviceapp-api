const express = require("express")
const { postUserView, LoginUserView, sendPassword, postUserProfileView, getUserProfileView, updateUserProfileView, getPopularUserProfileView, postUserGuestView } = require("../View/UserView")
const auth = require("../middlewares/auth")


const userRouter = express()
userRouter.post("/profile", auth, postUserProfileView)
userRouter.get("/profile",auth, getUserProfileView)
userRouter.put("/profile",auth, updateUserProfileView)
userRouter.get("/profile/popular",auth, getPopularUserProfileView)
userRouter.post("/signup", postUserView)
userRouter.post("/login", LoginUserView)
userRouter.get("/guestlogin", postUserGuestView)
userRouter.get("/sendpassword", sendPassword)

module.exports =  userRouter