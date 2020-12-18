const express = require("express");
const cors = require("cors");
const { join } = require("path");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} = require("./lib/errorHandling");

const mediaRouter = require("./media");

const server = express();
const port = process.env.PORT || 3003;

const whitelist =
  process.env.NODE_ENV === "production"
    ? [process.env.FE_URL_PROD]
    : [process.env.FE_URL_DEV];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("NOT ALLOWED - CORS ISSUES"));
    }
  },
};

server.use(cors(corsOptions));
server.use(express.json());

server.use("/images", express.static(join(__dirname, "../public/images")));

server.use("/media", mediaRouter);

server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

server.listen(port, () => {
  console.log("Server running away on port: ", port);
});
