const express = require("express")
const auth = require("../middlewares/auth")
const {
  OrderPostView,
  GetBuyerOrderView,
  GetSellerOrderView,
  SingleBuyerOrderView,
  SingleSellerOrderView,
  SingleBuyerOrderUpdateView,
} = require("../View/OrderView")

const orderRouter = express()
orderRouter.post("/order", auth, OrderPostView)
orderRouter.get("/order", auth, GetBuyerOrderView)
orderRouter.get("/order/:id", auth, GetSellerOrderView)
orderRouter.put("/order/:id", auth, SingleBuyerOrderView)
orderRouter.delete("/order/:id", auth, SingleSellerOrderView)
orderRouter.delete("/order/:id", auth, SingleBuyerOrderUpdateView)

module.exports = orderRouter
