const express = require("express");
const app = express(); 
const cors = require("cors"); 

app.use(express.json()); 
// importing the configuration file when app is not in production.
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

app.use(
  cors({
    origin: `*`,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const apies = require("./routes");
// api
app.use("/api", apies);

app.get("/", (req, res) => {
  res.send("Api running...");
});

module.exports = app;
