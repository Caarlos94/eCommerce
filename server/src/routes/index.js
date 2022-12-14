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

// ESTA FUNCION DEBE EJECUTARSE EN EL CARRITO PARA REDIRECCIONAR A PAGO EN MERCADOPAGO

// testItemsData debe ser el array de items a pagar
// Hay un ejemplo del array en en la carpeta "Ejemplos de items a pagar"

// const handleBuy = () => {
//   fetch("http://localhost:3001/payment", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(testItemsData),
//   })
//     .then((data) => data.json())
//     .then((data) => {
//       if (data.error) console.log(data); // manejar caso de error
//       window.open(data["init_point"], "_self");
//     });
// };

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
