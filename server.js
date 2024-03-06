//---------importing all necessary libraries---------//
const express = require("express");
const mongoose = require("mongoose");
const Order = require("./models/order");
const session = require("express-session");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");
const Emitter = require("events");
const http = require("http");
const socketio = require("socket.io");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
// importing all routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cartRoutes = require("./routes/cartRoutes");

const server = http.createServer(app);

//------------ connecting to the mongodb database----------//
const url = process.env.DATABASE;
const PORT = process.env.PORT || 8081;

mongoose
  .connect(url)
  .then((result) => {
    server.listen(PORT, () => console.log("server connected", PORT));
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected");
  })
  .on("error", console.error.bind(console, "connection error:"));

// emitter
const eventEmitter = new Emitter();
app.set("eventEmitter", eventEmitter);

//-----------middlewares--------------//
const adminAuth = require("./middlewares/adminAuth");
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://slice-of-delight.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

//session store
const mongoStore = MongoDbStore.create({
  mongoUrl: url,
  collectionName: "sessions", // name of the collection in database
});
//session config
app.use(
  session({
    secret: process.env.SECRETKEY,
    proxy: true,
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

//passport config
const passportInit = require("./passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//---------Routes--------------//

app.use("/api", customerRoutes);
app.use("/api", cartRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

// api for updating the order status using socket io
app.post("/api/admin/orders/status", adminAuth, (req, res) => {
  const { orderId, status } = req.body;

  Order.updateOne({ _id: orderId }, { orderStatus: status }, (err, result) => {
    if (err) {
      res.status(400).json({ message: "error" });
    }
    // emit event
    const eventEmitter = req.app.get("eventEmitter");
    eventEmitter.emit("orderUpdated", { id: orderId, status });
    res.status(200).json(result);
  });
});

//---------- socket io -----------//

var io = socketio(server);
var io = socketio(server, {
  cors: {
    origin: "https://slice-of-delight.vercel.app",
  },
});

io.on("connection", (socket) => {
  socket.on("join", (roomName) => {
    if (roomName) {
      socket.join(roomName);
    }
  });
});

eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
