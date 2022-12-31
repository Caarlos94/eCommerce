const { Router } = require("express");
const { Producto } = require('../db.js');

const productRouter = require("./productRouter.js");
const userRouter = require("./userRouter.js");
const customerQARouter = require("./customerQARouter");
const adminQARouter = require("./adminQARouter");
const categoryRouter = require("./categoryRouter")

const router = Router();
const mercadopago = require("mercadopago");
const express = require("express");


router.use(express.json());

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/customerQA", customerQARouter);
router.use("/adminQA", adminQARouter);
router.use("/category", categoryRouter)


mercadopago.configure({
  access_token:
    "APP_USR-8763313892706046-121400-b6b39cc901e4f87d36ca35efbd37f52c-1263181426",
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


/* router.get("/", async (req, res) => {
  try {
    let categoria = await getCategories();
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).send(error.message);
  }
}); */


module.exports = router;
