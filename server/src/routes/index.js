const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const product = require("./ProductRoutes");
const category = require("./CategoryRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/products", product);
router.use("/categories", category);

module.exports = router;
