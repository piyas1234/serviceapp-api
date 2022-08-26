 


const express = require("express")
const auth = require("../middlewares/auth")
const {
    CommentsPostView,
    CommentsGetView,
    CommentsDeleteView,
    CommentsUpdateView,
    CommentsGetCountView,
} = require("../View/CommentView")

const commentsRouter = express()
commentsRouter.post("/comments",auth,  CommentsPostView)
commentsRouter.get("/comments/:id",auth,  CommentsGetView)
commentsRouter.get("/comments/count/:id",auth,  CommentsGetCountView)
commentsRouter.delete("/comments/:id",auth,  CommentsDeleteView)
commentsRouter.put("/comments",auth,  CommentsUpdateView)
 
module.exports = commentsRouter