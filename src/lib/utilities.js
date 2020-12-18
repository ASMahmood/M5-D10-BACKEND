const { readJson, writeJson } = require("fs-extra");
const { join } = require("path")

const moviePath = join(__dirname, "../movies/movies.json")

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
    readMovies = async() => readDB(moviePath),
    writeMovies = async(data) => writeDB(moviePath, data)
}