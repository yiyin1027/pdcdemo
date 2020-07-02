const mongoose = require("mongoose");
const keys = require("./Keys");

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(keys.mongoURI, config, () => {
  console.log("connected to mongo db");
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose is connected!');
});

db.on('error', () => {
  console.log('Connection Error!');
});