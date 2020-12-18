const express = require("express");

const { readMedia, writeMedia } = require("../lib/utilities");

const mediaRouter = express.Router();

mediaRouter.get("/", async (req, res, next) => {
  try {
    const mediaDB = await readMedia();
    console.log(mediaDB);
    res.send(mediaDB);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

mediaRouter.post("/", async (req, res, next) => {
  try {
    const mediaDB = await readMedia();
    mediaDB.push(req.body);
    await writeMedia(mediaDB);
    res.send("Added!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = mediaRouter;
