const { Router } = require("express");
const router = Router();

const {
  getProducts,
  setDefaultData,
  updateProduct,
} = require("../controllers/ProductController");

router.get("/defaultData", setDefaultData);

router.get("/", getProducts);

router.put("/", updateProduct);

module.exports = router;
