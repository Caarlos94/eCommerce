const { Router } = require("express");
const router = Router();

const {
  getProducts,
  fillWithFirebaseData,
  updateProduct,
} = require("../controllers/ProductController");

router.get("/dummydata", fillWithFirebaseData);

router.get("/", getProducts);

router.put("/", updateProduct);

module.exports = router;
