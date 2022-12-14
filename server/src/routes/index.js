const { Router } = require("express");
const { getCategories } = require("./functions");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRouter = require("./productRouter.js");
const userRouter = require("./productRouter.js");

const router = Router();

const PaymentController = require("../Controllers/PaymentsController");
const PaymentService = require("../Services/PaymentsService");

const PaymentInstance = new PaymentController(new PaymentService());

router.post("/payment", (req, res, next) => {
  PaymentInstance.getPaymentLink(req, res);
});

// router.get("/subscription", (req, res, next) => {
//   // debería ser post si realmente se fuera a usar
//   PaymentInstance.getSubscriptionLink(req, res);
// });

router.use("/products", productRouter);
router.use("/user", userRouter);

router.get("/category", async (req, res) => {
  try {
    let categoria = await getCategories();
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
