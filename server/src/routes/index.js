const { Router } = require("express");
const axios = require("axios");
// let data = require("../data");
const { Producto, Categoria } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const Category = ["Camperas", "Remeras", "Zapatillas", "Shorts", "Pantalones"];

router.get("/category", async (req, res) => {
  try {
    const categoria = Category; // Array
    console.log(categoria);
    categoria.forEach(async (nombre) => {
      await Categoria.findOrCreate({ where: { nombre: nombre } });
    });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/products/", async (req, res) => {
  try {
    axios
      .get("https://supra-sports-default-rtdb.firebaseio.com/.json")
      .then((response) =>
        response.data.Productos.forEach(async (el) => {
          const addedProduct = await Producto.findOrCreate({
            where: {
              URL: el.URL,
              color: el.color,
              marca: el.marca,
              precio: el.precio,
              talla: el.talla,
            },
          });

          console.log(addedProduct[0]);

          const matchingCategory = await Categoria.findAll({
            where: { nombre: el.categoria },
          });

          addedProduct[0].addCategoria(matchingCategory);
        })
      );

    res.status(200).json(await Producto.findAll());
    return;
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
