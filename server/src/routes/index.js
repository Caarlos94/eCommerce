const { Router } = require("express");
const { getCategories } = require("./functions");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const productRouter = require("./productRouter.js");
const userRouter = require("./userRouter.js");
const customerQARouter = require("./customerQARouter");
const adminQARouter = require("./adminQARouter");

const router = Router();
const mercadopago = require("mercadopago");

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/customerQA", customerQARouter);
router.use("/adminQA", adminQARouter);

mercadopago.configure({
  access_token: "TEST-8763313892706046-121400-1f81130c8eea6eec0631d629769666b3-1263181426",
});


let obj = {}


router.post("/pagosMeli", async (req, res) => {
  let items = req.body.items;

  let itemsArr = [];
  items.forEach(item => itemsArr.push({
    id: item.id,
    title: item.nombre,
    currency_id: "ARS",
    picture_url: item.URL,
    quantity: 1,
    unit_price: parseInt(item.precio),
  }))
  let preference = {
    items: itemsArr,
    back_urls: {
      success: "http://localhost:3001/redirect"
    },
  
  };

  obj = items

  mercadopago.preferences.create(preference)
    .then(function (response) {

      res.json(response.body.init_point)
    })
    .catch(function (error) {
      console.log(error);
    });
})


router.get("/redirect", async (req, res) => { 

    const { status } = req.query
   try {
    
   console.log(status);
   console.log(obj);

   res.redirect('http://localhost:3000')
   } catch (error) {
    console.log('err');
   }


 
})



router.get("/", async (req, res) => {
  try {
    let categoria = await getCategories();
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/category", async (req, res) => {
  try {
    let categoria = await getCategories()
    res.status(200).json(categoria)
  } catch (error) {
    res.status(400).send(error.message)
  }
})



router.use('/products', productRouter);
router.use('/user', userRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
