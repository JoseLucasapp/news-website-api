import mongoose from "mongoose";

mongoose.Promise = global.Promise

module.exports = mongoose.connect(process.env, { useNewUrlParser: true, useUnifiedTopology: true })