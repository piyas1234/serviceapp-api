const express = require('express')
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const userRouter = require('./src/Route/UserRoute');
var cors = require('cors');
const servicesRouter = require('./src/Route/ServicesRoute');
const globalRouter = require('./src/Route/GlobalRoute');
const gigsRouter = require('./src/Route/GigsRouter');
const connectionRouter = require('./src/Route/ConnectionRoute');
const orderRouter = require('./src/Route/OrderRoute');
const reviewRouter = require('./src/Route/ReviewRoute');
 
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();


app.use("",userRouter)
app.use("",servicesRouter)
app.use("",gigsRouter)
app.use("",globalRouter)
app.use("",connectionRouter)
app.use("",orderRouter)
app.use("",reviewRouter)
   

app.get("/", (req, res)=>{
    return res.json("Hello World")
})

mongoose.connect(
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_TEST_URI
      : process.env.MONGO_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  mongoose.connection.once("open", () => {
    const port = process.env.PORT || 1000;
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });

 