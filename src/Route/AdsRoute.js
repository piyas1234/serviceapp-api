const express = require("express")
const auth = require("../middlewares/auth")
const {
    AdsPostView,
    AdsGetView,
    AdsGetUserView,
    AdsGetPublicView,
    AdsGetCategoryView,
    SingleAdsView,
    AdsDeleteView,
    AdsUpdateView
} = require("../View/AdsView")

const adsRouter = express()
adsRouter.post("/ads",auth,  AdsPostView)
adsRouter.get("/ads", auth,  AdsGetView)
adsRouter.get("/ads/user", auth,  AdsGetUserView)
adsRouter.get("/ads/user/:id", auth,  AdsGetPublicView)
adsRouter.get("/ads/:id", auth,  SingleAdsView)
adsRouter.put("/ads/:id",auth, AdsUpdateView)
adsRouter.delete("/ads/:id",auth, AdsDeleteView)
adsRouter.get("/ads/category/:name",auth, AdsGetCategoryView)

module.exports = adsRouter