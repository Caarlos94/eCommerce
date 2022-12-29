const { Router } = require("express");
const { getCategories } = require("./functions");
const { Categoria, Producto } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const productRouter = require("./productRouter.js");
const userRouter = require("./userRouter.js");
const customerQARouter = require("./customerQARouter");
const adminQARouter = require("./adminQARouter");

const router = Router();
const mercadopago = require("mercadopago");
const express = require("express");

router.use(express.json());

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/customerQA", customerQARouter);
router.use("/adminQA", adminQARouter);

mercadopago.configure({
  access_token:
    "APP_USR-8763313892706046-121400-b6b39cc901e4f87d36ca35efbd37f52c-1263181426",
  /* access_token: "TEST-8763313892706046-121400-1f81130c8eea6eec0631d629769666b3-1263181426", PREGUNTAR ALEJANDRO*/
});

let obj = {}

router.post("/pagosMeli", async (req, res) => {
  let items = req.body.items;
   obj = items
  let itemsArr = [];
  if(items[0].stock > 0) {
  items.forEach(item => itemsArr.push({
    id: item.id,
    title: item.nombre,
    currency_id: "ARS",
    picture_url: item.URL,
    quantity: items[0].cantidad,
    unit_price: parseInt(item.precio),
  }))
}

  let preference = {
    items: itemsArr,
    back_urls: {
      success: "http://localhost:3001/redirect",
      failure: "http://localhost:3001/redirect",
      pending: "http://localhost:3001/redirect"
    }
  };

  mercadopago.preferences.create(preference)
    .then(function (response) {
      // console.log(response.body);
      /* res.redirect(response.body.init_point) */
      res.json(response.body.init_point)
    })
    .catch(function (error) {
      console.log(error);
    });
}) 


router.get("/redirect", async (req, res) => {
    let { status } = req.query
    
    if(status === "approved"){

      
      obj.forEach(async producto => {

        let productStock = await Producto.findByPk(producto.id)
        let stock = productStock.stock
        const modifiedProduct = await Producto.update(
          { stock: rest },
          { where: { id: producto.id } } );  
        })

      try {
        res.redirect('http://localhost:3000')
      } catch (error) { 
        res.status(400).send(error.message)
      }
  }
})

router.get("/category", async (req, res) => {
  try {
    let categoria = await getCategories()
    res.status(200).json(categoria)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post("/category", async(req, res) => {
  try {
    const categoria = req.body
    const newCategory = await Categoria.create(categoria)
    res.status(200).json(newCategory)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
