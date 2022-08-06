const express = require("express");
const auth = require("../middlewares/auth");
const {
  SingleConnectionDeleteView,
  connectionPostView,
  SingleConnectionView,
  GetConnectionView,
  connectionPostMessageView
} = require("../View/ConnectionView");

const connectionRouter = express();
connectionRouter.post("/connection", auth, connectionPostView);
connectionRouter.post("/connection", auth, connectionPostMessageView);
connectionRouter.get("/connection", auth, GetConnectionView);
connectionRouter.get("/connection:id", auth, SingleConnectionView);
connectionRouter.delete("/connection:id", auth, SingleConnectionDeleteView);

module.exports = connectionRouter;
