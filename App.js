const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRouter = require("./src/Route/UserRoute");
var cors = require("cors");
const servicesRouter = require("./src/Route/ServicesRoute");
const globalRouter = require("./src/Route/GlobalRoute");
const gigsRouter = require("./src/Route/GigsRouter");
const connectionRouter = require("./src/Route/ConnectionRoute");
const orderRouter = require("./src/Route/OrderRoute");
const reviewRouter = require("./src/Route/ReviewRoute");
const messageRouter = require("./src/Route/MessageRoute");
const businessRouter = require("./src/Route/BusinessRoute");
const JobsRouter = require("./src/Route/JobsRoute");
const adsRouter = require("./src/Route/AdsRoute");
const commentsRouter = require("./src/Route/CommentsRoute");
const ReactionRouter = require("./src/Route/ReactionRouter");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();
const httpServer = require("http").createServer(app);
const options = { cors: { origin: "*" } };
const io = require("socket.io")(httpServer, options);

app.use("", userRouter);
app.use("", servicesRouter);
app.use("", gigsRouter);
app.use("", globalRouter);
app.use("", connectionRouter);
app.use("", messageRouter);
app.use("", orderRouter);
app.use("", reviewRouter);
app.use("", businessRouter);
app.use("", JobsRouter);
app.use("", adsRouter);
app.use("", commentsRouter);
app.use("", ReactionRouter);

app.get("/", (req, res) => {
  return res.json("Hello World");
});

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
  httpServer.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

const messageNamespace = io.of("/messages");
const onlineNamespace = io.of("/online");
const adsNamespace = io.of("/ads");
const jobsNamespace = io.of("/jobs");
const businessNamespace = io.of("/business");

messageNamespace.on("connection", (socket) => {
  let users;
  let recivers;
  socket.on("send", (val, user = "", reciver = "") => {
    recivers = reciver;
    users = user;
    socket.broadcast.emit(reciver, {
      message: val,
      id: socket.id,
      user,
      reciver,
      gigs: null,
    });
  });

  socket.on("disconnect", (props) => {
    socket.broadcast.emit(recivers, {
      message: "offline",
      id: socket.id,
      user: users,
      reciver: recivers,
      gigs: null,
    });
  });
});

onlineNamespace.on("connection", (socket) => {
  let id;
  socket.on("user", (user_id) => {
    id = user_id;
    socket.broadcast.emit(user_id, { id: user_id });
  });
  socket.on("disconnect", (props) => {
    socket.broadcast.emit(id, { id: false });
  });
});

adsNamespace.on("connection", (socket) => {
  console.log("Connected ads")
  socket.on("adsnotification", (reciverId, notificationId, sender) => {
    console.log(reciverId)
    socket.broadcast.emit(reciverId, {
      notificationId,
      sender,
    });
  });
});


jobsNamespace.on("connection", (socket) => {
  socket.on("jobsnotification", (reciverId, notificationId, sender) => {
    socket.broadcast.emit(reciverId, {
      notificationId,
      sender,
    });
  });
});


businessNamespace.on("connection", (socket) => {
  socket.on("businessnotification", (reciverId, notificationId, sender) => {

    console.log(reciverId,'reciverId')
    socket.broadcast.emit(reciverId, {
      notificationId,
      sender,
    });
  });
});