const express = require("express");
const auth = require("../middlewares/auth");
const {
  GigsPostView,
  GigsGetView,
  GigsDeleteView,
  GigsUpdateView,
  SingleGigsView,
  GigsGetUserView,
  GigsGetCategoryView,
  GigsGetPublicView
} = require("../View/GigsView");

const gigsRouter = express();
gigsRouter.post("/gigs",auth,  GigsPostView);
gigsRouter.get("/gigs", auth,  GigsGetView);
gigsRouter.get("/gigs/user", auth,  GigsGetUserView);
gigsRouter.get("/gigs/user/:id", auth,  GigsGetPublicView);
gigsRouter.get("/gigs/:id", auth,  SingleGigsView);
gigsRouter.put("/gigs/:id",auth, GigsUpdateView);
gigsRouter.delete("/gigs/:id",auth, GigsDeleteView);
gigsRouter.get("/gigs/category/:name",auth, GigsGetCategoryView);

module.exports = gigsRouter;


 