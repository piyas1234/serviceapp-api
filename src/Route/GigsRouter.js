const express = require("express");
const auth = require("../middlewares/auth");
const {
  GigsPostView,
  GigsGetView,
  GigsDeleteView,
  GigsUpdateView,
  SingleGigsView,
} = require("../View/GigsView");

const gigsRouter = express();
gigsRouter.post("/gigs",auth,  GigsPostView);
gigsRouter.get("/gigs", auth,  GigsGetView);
gigsRouter.get("/gigs:id", auth,  SingleGigsView);
gigsRouter.put("/gigs:id",auth, GigsUpdateView);
gigsRouter.delete("/gigs:id",auth, GigsDeleteView);

module.exports = gigsRouter;


 