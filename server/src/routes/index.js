const { Router } = require("express");
const axios = require("axios");
const { Producto, Categoria } = require("../db");



const router = Router();


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
              nombre: el.nombre,
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


