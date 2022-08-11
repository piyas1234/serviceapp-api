const express = require("express");
const {
  ReviewrPostView,
  ReviewsDeleteView,
  ReviewsGetGigsView,
  ReviewsGetUserView,
} = require("../View/ReviewView");

const reviewRouter = express();
reviewRouter.post("/review", ReviewrPostView);
reviewRouter.get("/review/gig/:id", ReviewsGetGigsView);
reviewRouter.get("/review/user/:id", ReviewsGetUserView);
reviewRouter.delete("/review/:id", ReviewsDeleteView);

module.exports = reviewRouter;
