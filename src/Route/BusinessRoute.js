const express = require("express")
const auth = require("../middlewares/auth")
const {
    BusinessPostView,
    BusinessGetView,
    BusinessGetUserView,
    BusinessGetPublicView,
    BusinessGetCategoryView,
    SingleBusinessView,
    BusinessDeleteView,
    BusinessUpdateView
} = require("../View/BusinessView")

const businessRouter = express()
businessRouter.post("/business",auth,  BusinessPostView)
businessRouter.get("/business", auth,  BusinessGetView)
businessRouter.get("/business/user", auth,  BusinessGetUserView)
businessRouter.get("/business/user/:id", auth,  BusinessGetPublicView)
businessRouter.get("/business/:id", auth,  SingleBusinessView)
businessRouter.put("/business/:id",auth, BusinessUpdateView)
businessRouter.delete("/business/:id",auth, BusinessDeleteView)
businessRouter.get("/business/category/:name",auth, BusinessGetCategoryView)

module.exports = businessRouter