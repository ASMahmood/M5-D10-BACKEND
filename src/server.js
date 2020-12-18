const express = require("express");
const cors = require("cors");

const server = express();
const port = 6969;

server.use(cors());
server.use(express.json());

server.listen(port, () => {
  console.log("Server running away on port: ", port);
});
