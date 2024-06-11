// import express from "express";
const express=require('express')

// import { handleGenerateNewShortURL, handleGetAnalytics } from "../controllers/controller.js";
const {handleGenerateNewShortURL,handleGetAnalytics } =require('../controllers/controller.js')

// import URL from "../models/model.js";
const URL=require('../models/model.js')

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/analytics", async (req, res) => {
  try {
    const urls = await URL.find();
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// export default router;
module.exports = router;
