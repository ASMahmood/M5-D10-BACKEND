const { readJson, writeJson } = require("fs-extra");
const { join } = require("path");

const mediaPath = join(__dirname, "../media/media.json");

const readDB = async (filepath) => {
  try {
    const fileJson = await readJson(filepath);
    return fileJson;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const writeDB = async (filepath, data) => {
  try {
    await writeJson(filepath, data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  readMedia: async () => readDB(mediaPath),
  writeMedia: async (data) => writeDB(mediaPath, data),
};
