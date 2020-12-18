const express = require("express");
const uniqid = require("uniqid");

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

////REVIEWS

mediaRouter.get("/:mediaID/reviews", async (req, res, next) => {
  try {
    const mediaDB = await readMedia();
    const singleMedia = mediaDB.find(
      (media) => media.imdbID === req.params.mediaID
    );
    if (singleMedia) {
      if (singleMedia.hasOwnProperty("reviews")) {
        res.status(200).send(singleMedia.reviews);
      } else {
        res.status("404").send("There are no reviews for this media :(");
      }
    } else {
      console.log(error);
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

mediaRouter.post("/:mediaID/reviews", async (req, res, next) => {
  try {
    const mediaDB = await readMedia();
    const singleMediaIndex = mediaDB.findIndex(
      (media) => media.imdbID === req.params.mediaID
    );
    if (singleMediaIndex !== -1) {
      if (mediaDB[singleMediaIndex].hasOwnProperty("reviews")) {
        mediaDB[singleMediaIndex].reviews.push({
          ...req.body,
          _id: uniqid(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        mediaDB[singleMediaIndex].reviews = [
          {
            ...req.body,
            _id: uniqid(),
            elementId: req.params.mediaDB,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
      await writeMedia(mediaDB);
      res.send("Added!");
    } else {
      const err = new Error();
      err.httpStatusCode = 404;
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

mediaRouter.put("/:mediaID/reviews/:reviewID", async (req, res, next) => {
  try {
    const mediaDB = await readMedia();
    const singleMediaIndex = mediaDB.findIndex(
      (media) => media.imdbID === req.params.mediaID
    );
    if (singleMediaIndex !== -1) {
      let selectedReview = mediaDB[singleMediaIndex].reviews.findIndex(
        (review) => review._id === req.params.reviewID
      );
      mediaDB[singleMediaIndex].reviews[selectedReview] = {
        ...mediaDB[singleMediaIndex].reviews[selectedReview],
        ...req.body,
        updatedAt: new Date(),
      };
      await writeMedia(mediaDB);
      res.send("Deleted!");
    } else {
      const err = new Error();
      err.httpStatusCode = 404;
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

mediaRouter.delete("/:mediaID/reviews/:reviewID", async (req, res, next) => {
  try {
    const mediaDB = await readMedia();
    const singleMediaIndex = mediaDB.findIndex(
      (media) => media.imdbID === req.params.mediaID
    );
    if (singleMediaIndex !== -1) {
      let filteredReviews = mediaDB[singleMediaIndex].reviews.filter(
        (review) => review._id !== req.params.reviewID
      );
      mediaDB[singleMediaIndex].reviews = filteredReviews;
      await writeMedia(mediaDB);
      res.send("Deleted!");
    } else {
      const err = new Error();
      err.httpStatusCode = 404;
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = mediaRouter;
