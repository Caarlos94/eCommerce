const { Router } = require("express");
const router = Router();

const {
  getSizes,
  postSize,
  updateSize,
  // deleteColor,
} = require("../controllers/SizeControllers");

router.get("/", getSizes);

router.post("/", postSize);

router.put("/", updateSize);

// router.delete("/", deleteColor);

module.exports = router;
