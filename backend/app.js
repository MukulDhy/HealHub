// Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("colors");

// Initializing app
const app = express();

// Configurations
dotenv.config({ path: "backend/config/config.env" });

// Global Middleware
app.use(express.json({ limit: "50mb" })); // Increase payload size limit
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Increase payload size limit for URL-encoded data, if needed
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Error Handling for Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`.underline.bgRed);
  console.log(`Error : ${err.stack}`.underline.bgYellow);
  console.log(
    `Shutting Down the server due to uncaughtException`.underline.bgMagenta.bold
  );
  process.exit(1);
});

// Exporting app
module.exports = app;
