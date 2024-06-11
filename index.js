// import express from "express";
const express=require('express')
// import {connectToMongoDB} from "./connect.js";
const {connectToMongoDB} =require('./connect.js')
const mongoose=require('mongoose')
// import router from "./routes/route.js";
const router = require('./routes/route.js');
// import URL from "./models/model.js";
const URL= require('./models/model.js')
// import cors from "cors";
const cors= require('cors')

const app = express();
const PORT = 8001;

mongoose.connect("mongodb://localhost:27017/short-url-backend").then(() =>
  // mongodb+srv://mamathakempeli:<password>@cluster0.zzgmfiy.mongodb.net/
// mongoose.connect("mongodb+srv://mamathakempeli:mamatha@cluster0.zzgmfiy.mongodb.net/shorturlbackend").then(() =>

  console.log("Mongodb connected")
);

app.use(cors());
app.use(express.json());

app.use("/url", router);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
