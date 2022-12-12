const { Router } = require("express");
const router = Router();

const {
  getSizes,
  postSize,
  updateSize,
  deleteSize,
} = require("../controllers/SizeControllers");

router.get("/", getSizes);

router.post("/", postSize);

router.put("/", updateSize);

router.delete("/", deleteSize);

module.exports = router;
