const { Router } = require("express");
const router = Router();

const {
  getProducts,
  setProductDefaultData,
  updateProduct,
} = require("../controllers/ProductController");

router.get("/defaultData", setProductDefaultData);

router.get("/", getProducts);

router.put("/", updateProduct);

module.exports = router;
