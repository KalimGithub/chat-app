// imports
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const clc = require("cli-color");
const userRoutes = require("./routes/userRoute");
const messageRoutes = require("./routes/messageRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { app, server } = require("./SocketIO/index.js");
// constants
// const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// middlewares
// app.use(express.urlencoded());
app.use(express.json());
app.use(
  cors()
  // cors({
  //   origin: "http://localhost:5173", // Replace with your frontend URL
  //   credentials: true, // Allow credentials (cookies) to be sent
  // })
);
app.use(cookieParser());

// user routes
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

// mongodb connection and express app listener
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(
      clc.yellowBright.underline.bold("Mongodb connected successfully!")
    );
    // making express app a listener --> server will listen only after successful db conection
    try {
      server.listen(PORT, () => {
        console.log(
          clc.yellowBright.underline(
            `Server is running on port:http://localhost:${PORT}`
          )
        );
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.log(error);
  });
