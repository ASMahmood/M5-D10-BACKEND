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

mediaRouter.get("/:mediaID", async (req, res, next) => {
  try {
    const mediaDB = await readMedia();
    const singleMedia = mediaDB.find(
      (media) => media.imdbID === req.params.mediaID
    );
    if (singleMedia) {
      res.send(singleMedia);
    } else {
      console.log(error);
      next(error);
    }
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

mediaRouter.post("/:mediaID", async (req, res, next) => {
  try {
    const mediaDB = await readMedia();
    const singleMedia = mediaDB.findIndex(
      (media) => media.imdbID === req.params.mediaID
    );
    if (singleMedia !== -1) {
      mediaDB[singleMedia] = req.body;
      await writeMedia(mediaDB);
      res.send("Edited!");
    } else {
      console.log(error);
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

mediaRouter.delete("/:mediaID", async (req, res, next) => {
  try {
    const mediaDB = await readMedia();
    const singleMedia = mediaDB.find(
      (media) => media.imdbID === req.params.mediaID
    );
    if (singleMedia) {
      const filteredMediaDB = mediaDB.filter(
        (media) => media.imdbID !== req.params.mediaID
      );
      await writeMedia(filteredMediaDB);
      res.send("Deleted!");
    } else {
      console.log(error);
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = mediaRouter;
