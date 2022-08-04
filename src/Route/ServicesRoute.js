const express = require("express");
const { ServicerPostView, ServicesGetView, ServicesUpdateView, ServicesDeleteView } = require("../View/ServicesView");
 

const servicesRouter = express();
servicesRouter.post("/service", ServicerPostView)
servicesRouter.get("/service", ServicesGetView)
servicesRouter.put("/service", ServicesUpdateView)
servicesRouter.delete("/service", ServicesDeleteView)

module.exports =  servicesRouter;