const { Router } = require("express");
const router = Router();

const {
  getColors,
  postColor,
  updateColor,
  deleteColor,
} = require("../controllers/ColorControllers");

router.get("/", getColors);

router.post("/", postColor);

router.put("/", updateColor);

router.delete("/", deleteColor);

module.exports = router;
