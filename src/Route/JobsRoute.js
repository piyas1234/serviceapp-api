const express = require("express")
const auth = require("../middlewares/auth")
const {
    JobsPostView,
    JobsGetView,
    JobsGetUserView,
    JobsGetPublicView,
    JobsGetCategoryView,
    SingleJobsView,
    JobsDeleteView,
    JobsUpdateView
} = require("../View/JobsView")

const JobsRouter = express()
JobsRouter.post("/Jobs",auth,  JobsPostView)
JobsRouter.get("/Jobs", auth,  JobsGetView)
JobsRouter.get("/Jobs/user", auth,  JobsGetUserView)
JobsRouter.get("/Jobs/user/:id", auth,  JobsGetPublicView)
JobsRouter.get("/Jobs/:id", auth,  SingleJobsView)
JobsRouter.put("/Jobs/:id",auth, JobsUpdateView)
JobsRouter.delete("/Jobs/:id",auth, JobsDeleteView)
JobsRouter.get("/Jobs/category/:name",auth, JobsGetCategoryView)

module.exports = JobsRouter