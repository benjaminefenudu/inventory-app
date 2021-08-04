const mongoose = require("mongoose");

// Setup Environment Variables
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Setup Database
const connectDatabase = async (app) => {
  try {
    await mongoose.connect(
      process.env.DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      () => {
        console.log("Connected to database...");
        app.listen(PORT, () =>
          console.log(`Server listening on localhost:${PORT}...`)
        );
      }
    );
  } catch (error) {
    handleError(error);
  }
};

const ngrok = require("ngrok");
const generateNgrokURL = async function () {
    const url = await ngrok.connect(process.env.PORT);
    console.log(url);
  };

module.exports = {connectDatabase, generateNgrokURL};
