 


const express = require("express")
const auth = require("../middlewares/auth")
const {
    ReactionPostView,
    ReactionGetView,
    ReactionDeleteView,
    ReactionUpdateView,
} = require("../View/ReactionView")

const ReactionRouter = express()
ReactionRouter.post("/reaction",auth,  ReactionPostView)
ReactionRouter.get("/reaction/:id",auth,  ReactionGetView)
ReactionRouter.delete("/reaction/:id",auth,  ReactionDeleteView)
ReactionRouter.put("/reaction",auth,  ReactionUpdateView)
 
module.exports = ReactionRouter