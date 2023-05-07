const express = require("express")
const { getHomeView, getSearchView, getSearchServiceView, getAllDataForInitialPages } = require("../View/Global")
 

const globalRouter = express()
 
globalRouter.get("/home", getHomeView)
globalRouter.get("/search", getSearchView)
globalRouter.get("/searchservices", getSearchServiceView)
globalRouter.get("/global", getAllDataForInitialPages)
 

module.exports =  globalRouter