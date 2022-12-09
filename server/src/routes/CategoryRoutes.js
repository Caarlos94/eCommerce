const { Router } = require("express");
const router = Router();

const {
  setCategoryDefaultData,
  getCategories,
  postCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/CategoryControllers");

router.get("/defaultData", setCategoryDefaultData);

router.get("/", getCategories);

router.post("/", postCategory);

router.put("/", updateCategory);

router.delete("/", deleteCategory);

module.exports = router;
