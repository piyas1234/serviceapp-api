 


const express = require("express")
const auth = require("../middlewares/auth")
const {
    CommentsPostView,
    CommentsGetView,
    CommentsDeleteView,
    CommentsUpdateView,
} = require("../View/CommentView")

const commentsRouter = express()
commentsRouter.post("/comments",auth,  CommentsPostView)
commentsRouter.get("/comments/:id",auth,  CommentsGetView)
commentsRouter.delete("/comments/:id",auth,  CommentsDeleteView)
commentsRouter.put("/comments",auth,  CommentsUpdateView)
 
module.exports = commentsRouter