 


const express = require("express")
const auth = require("../middlewares/auth")
const {
    messagePostView,
    GetMessageView,
    SingleMessageDeleteView
   
} = require("../View/MessageView")

const messageRouter = express()
messageRouter.post("/message", auth, messagePostView)
messageRouter.get("/message/:id", auth, GetMessageView)
messageRouter.delete("/message/:id", auth, SingleMessageDeleteView)
 

module.exports = messageRouter