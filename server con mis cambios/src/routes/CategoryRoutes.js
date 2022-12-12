const { Router } = require("express");
const router = Router();

const {
  getCategories,
  postCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/CategoryControllers");

router.get("/", getCategories);

router.post("/", postCategory);

router.put("/", updateCategory);

router.delete("/", deleteCategory);

module.exports = router;
