const express = require("express")
const auth = require("../middlewares/auth")
const {
  ReviewrPostView,
  ReviewsDeleteView,
  ReviewsGetGigsView,
  ReviewsGetUserView,
} = require("../View/ReviewView")

const reviewRouter = express()
reviewRouter.post("/review", auth, ReviewrPostView)
reviewRouter.get("/review/gig/:id", auth, ReviewsGetGigsView)
reviewRouter.get("/review/user/:id",auth, ReviewsGetUserView)
reviewRouter.delete("/review/:id",auth, ReviewsDeleteView)

module.exports = reviewRouter
