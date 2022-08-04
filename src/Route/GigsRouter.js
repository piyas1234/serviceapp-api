const express = require("express");
const auth = require("../middlewares/auth");
const {
  GigsPostView,
  GigsGetView,
  GigsDeleteView,
  GigsUpdateView,
} = require("../View/GigsView");

const gigsRouter = express();
gigsRouter.post("/gigs",auth, GigsPostView);
gigsRouter.get("/gigs",   GigsGetView);
gigsRouter.put("/gigs",auth, GigsUpdateView);
gigsRouter.delete("/gigs",auth, GigsDeleteView);

module.exports = gigsRouter;
