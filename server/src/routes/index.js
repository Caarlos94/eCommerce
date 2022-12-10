const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const product = require("./ProductRoutes");
const category = require("./CategoryRoutes");
const color = require("./ColorRoutes");
const size = require("./SizeRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/products", product);
router.use("/categories", category);
router.use("/colors", color);
router.use("/sizes", size);

module.exports = router;
