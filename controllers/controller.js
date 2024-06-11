// import generateShortId from 'ssid';
const generateShortId=require('ssid')

// import URL from "../models/model.js";
const URL=require('../models/model.js')

// import normalizeUrl from 'normalize-url';
const normalizeUrl=require('@esm2cjs/normalize-url')


// export async function handleGenerateNewShortURL(req, res) {
  module.export= async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  // Normalize the URL before checking
  const normalizedURL = normalizeUrl(body.url);
  
  // Check if the URL already exists in the database
  const existingURL = await URL.findOne({ redirectURL: normalizedURL });
  if (existingURL) {
    // If the URL exists, return the existing short link
    return res.json({ id: existingURL.shortId });
  }

  // Generate a short ID with default length (8 characters)
  const shortID = generateShortId();
  
  // Create a new entry in the database
  await URL.create({
    shortId: shortID,
    redirectURL: normalizedURL,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

// export async function handleGetAnalytics(req, res) {
  module.export = async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

