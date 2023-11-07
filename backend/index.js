require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');
const mongo = require('./models');

// REGISTERS MONGO DB MODELS
const registerModels = async () => {
  try {
    mongo.registerModels();
  } catch (error) {
    console.log('mongoDB register model failed', error);
    console.log('Error: ', error);
  }
};

// MAIN FUNCTION TO SETUP THE SERVER AND ALL IT'S DEPENDENCIES
const setupServer = async () => {
  try {
    // SETTING UP MONGO DATABASE
    await mongoose.connect(process.env.DB_CONNECTING_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('... MongoDB ✔');
    await registerModels();
    app.listen(process.env.SERVER_PORT);
    console.log(`--- Server started on ${process.env.SERVER_PORT} ---\n\n`);
  } catch (err) {
    console.log('server setup failed', err);
    console.log('Error: ', err.message);
  }
};

setupServer();
