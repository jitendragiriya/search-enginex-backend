// includint the require packages
const http = require("http");
const app = require("./app"); 
const ConnectDb = require("./config/db");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


// conneting the database.
ConnectDb();

const Errors = require("./Middlewares/Errors");
app.use(Errors);
// server listening
const PORT = process.env.PORT || 5000;

const server = http.createServer(app); 
 

server.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`error:${err.message}`);
  console.log("sutting down the server due to unhandled promis rejection.");
  server.close(() => {
    process.exit(1);
  });
});
