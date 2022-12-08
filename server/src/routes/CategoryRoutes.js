const { Router } = require("express");
const router = Router();

const {
  setDefaultData,
  getCategories,
  postCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/CategoryControllers");

router.get("/defaultData", setDefaultData);

router.get("/", getCategories);

router.post("/", postCategory);

router.put("/", updateCategory);

router.delete("/", deleteCategory);

module.exports = router;
