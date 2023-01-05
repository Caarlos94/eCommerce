const { Router } = require("express");
const { Images } = require('../db.js')
const { getImages } = require("./functions");
const imagesRouter = Router();

imagesRouter.get("/", async (req, res) => {
    try {
        res.status(200).json(await getImages())
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = imagesRouter;