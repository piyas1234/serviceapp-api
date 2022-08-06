const express = require("express");
const auth = require("../middlewares/auth");
const {
  OrderPostView,
  GetBuyerOrderView,
  GetSellerOrderView,
  SingleBuyerOrderView,
  SingleSellerOrderView,
  SingleBuyerOrderUpdateView,
} = require("../View/OrderView");

const orderRouter = express();
orderRouter.post("/gigs", auth, OrderPostView);
orderRouter.get("/gigs", auth, GetBuyerOrderView);
orderRouter.get("/gigs:id", auth, GetSellerOrderView);
orderRouter.put("/gigs:id", auth, SingleBuyerOrderView);
orderRouter.delete("/gigs:id", auth, SingleSellerOrderView);
orderRouter.delete("/gigs:id", auth, SingleBuyerOrderUpdateView);

module.exports = orderRouter;
