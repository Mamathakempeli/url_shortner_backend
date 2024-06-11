// import mongoose from "mongoose";
const mongoose=require('mongoose')

mongoose.set("strictQuery", true);
// export async function connectToMongoDB(url) {
  module.export = async function connectToMongoDB(url) {
  return mongoose.connect(url);
}
