const { Router } = require('express');
const { Producto } = require('../db.js');

const productRouter = require('./productRouter.js');
const userRouter = require('./userRouter.js');
const customerQARouter = require('./customerQARouter');
const adminQARouter = require('./adminQARouter');
const categoryRouter = require('./categoryRouter');
const compraRouter = require('./compraRouter');
const axios = require('axios');
const favoritosRouter = require("./favoritosRouter");
const cartRouter = require('./cartRouter')
const superAdminRouter = require('./superAdminRouter')

const router = Router();
const mercadopago = require('mercadopago');
const express = require('express');

router.use(express.json());

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/customerQA", customerQARouter);
router.use("/adminQA", adminQARouter);
router.use("/category", categoryRouter);
router.use("/favoritos", favoritosRouter);
router.use("/carrito", cartRouter);
router.use("/compras", compraRouter);
router.use("/superAdmin", superAdminRouter);


mercadopago.configure({
  access_token:
    'APP_USR-8763313892706046-121400-b6b39cc901e4f87d36ca35efbd37f52c-1263181426',
  /* access_token: "TEST-8763313892706046-121400-1f81130c8eea6eec0631d629769666b3-1263181426", PREGUNTAR ALEJANDRO*/
});

let obj = {};
let GuardarComprasDB = {
  clienteId: '',
  productos: [],
};

router.post('/pagosMeli', async (req, res) => {
  let items = req.body.items;
  let idUsuario = req.body.idUsuario;

  // obj = items
  let itemsArr = [];
  if (items[0].stock > 0) {
    items.forEach((item) =>
      itemsArr.push({
        id: item.id,
        title: item.nombre,
        currency_id: 'ARS',
        picture_url: item.URL,
        quantity: items[0].cantidad,
        unit_price: parseInt(item.precio),
      })
    );
  }

  let preference = {
    items: itemsArr,
    back_urls: {
      success: 'http://localhost:3001/redirect',
    },
  };

  obj = items;

  GuardarComprasDB.clienteId = idUsuario;

  GuardarComprasDB.clienteId = idUsuario;

  let arr = [];

  items.forEach((elem) => {
    const obj = {};
    (obj.prodId = elem.id), (obj.cantidad = elem.cantidad);
    arr.push(obj);
  });

  GuardarComprasDB.productos = arr;

  console.log(obj);
  console.log(GuardarComprasDB);

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get('/redirect', async (req, res) => {
  let { status } = req.query;

  if (status === 'approved') {
    obj.forEach(async (producto) => {
      let productStock = await Producto.findByPk(producto.id);
      let rest = productStock.stock - producto.cantidad;

      const modifiedProduct = await Producto.update(
        { stock: rest },
        { where: { id: producto.id } }
      );
    });
    console.log(obj);

    try {
      const ComprasGuardadas = await axios.post(
        'http://localhost:3001/compras',
        GuardarComprasDB
      );

      res.redirect('http://localhost:3000');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
});

router.use('/products', productRouter);
router.use('/user', userRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
