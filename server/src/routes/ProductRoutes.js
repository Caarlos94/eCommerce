const { Router } = require("express");
const router = Router();

const {
  getProducts,
  // setProductDefaultData,
  updateProduct,
  deleteProduct,
  postProduct,
} = require("../controllers/ProductController");

// router.get("/defaultData", setProductDefaultData);

router.get("/", getProducts);

router.put("/:id", updateProduct);

router.post("/", postProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
