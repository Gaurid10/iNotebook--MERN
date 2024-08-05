const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/"

async function connectToMongo() {
    await mongoose.connect(mongoURL).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }

  module.exports = connectToMongo;