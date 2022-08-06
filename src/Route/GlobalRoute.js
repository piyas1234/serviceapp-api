const express = require("express");
const { getHomeView, getSearchView, getSearchServiceView } = require("../View/Global");
 

const globalRouter = express();
 
globalRouter.get("/home", getHomeView)
globalRouter.get("/search", getSearchView)
globalRouter.get("/searchservices", getSearchServiceView)
 

module.exports =  globalRouter;