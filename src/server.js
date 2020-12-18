const express = require("express");
const cors = require("cors");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} = require("./lib/errorHandling");

const moviesRouter = require("./movies");

const server = express();
const port = process.env.PORT || 3003;

server.use(cors());
server.use(express.json());

server.use("/movies", moviesRouter);

server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

server.listen(port, () => {
  console.log("Server running away on port: ", port);
});