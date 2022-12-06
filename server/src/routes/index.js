const { Router } = require('express');
const {Products , Category} = require ('../data.js');
const { Categoria, Producto } = require("../db.js");  
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get("/category", async(req, res) => {
    try {
        const categoria = Category // Array
        categoria.forEach(async (nombre) => {
        await Categoria.findOrCreate({where: {nombre: nombre}})
        }) 
        res.status(200).json(categoria)
    } catch (error) {
       res.status(400).send(error.message) 
    }
})

router.get("/products", async(req, res) => {
    try {
        const products = Products // Array
        products.Productos.forEach(async (e) => {
        await Producto.findOrCreate({where: { URL: e.URL, color: e.color, marca: e.marca, talla: e.talla, precio: e.precio }}) 
        }) 
        res.status(200).json(products)

    } catch (error) {
       res.status(400).send(error.message) 
    }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;