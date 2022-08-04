const express = require("express");
const { getHomeView, getSearchView } = require("../View/Global");
 

const globalRouter = express();
 
globalRouter.get("/home", getHomeView)
globalRouter.get("/search", getSearchView)
 

module.exports =  globalRouter;