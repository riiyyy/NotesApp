// Importing Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inititating Express
const app = express();

// Environment Variables
require("dotenv").config();

// Connecting to Database
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("Connection to the Database was established!");
      console.log(`Server running at: http://localhost:${PORT}`);
    })
  )
  .catch((error) => console.log(" MongoDB connection error:", error));


// Middlewares
app.use(express.json()); // JSON Parser
app.use(express.urlencoded({ extended: true })); // URL Body Parser

// CORS
app.use(
  cors({
    origin: "*",
    // credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Routes
const routes = require("./routes/routes");
app.use(routes);
