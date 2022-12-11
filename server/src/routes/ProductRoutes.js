const { Router } = require("express");
const router = Router();

const {
  getProducts,
  setProductDefaultData,
  updateProduct,
} = require("../controllers/ProductController");

router.get("/defaultData", setProductDefaultData);

router.get("/", getProducts);

router.put("/:id", updateProduct); // deberia ser ruta PUT, solo tengo get de prueba

module.exports = router;
