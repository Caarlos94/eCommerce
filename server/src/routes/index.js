const { Router } = require('express');
const data = require("../data");
const { Producto, Categoria } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/productos", async (req, res) => {
    try {
        data.Productos.forEach(p => {
            Producto.findOrCreate({
                where: {
                    id: p.id,
                    url: p.url,
                    color: p.color,
                    precio: p.precio,
                    talla: p.talla,
                    marca: p.marca
                }
            })
        })
        const products = await Producto.bulkCreate(data.Productos);
        return res.status(200).json(products)
    } catch (error) {
        return res.status(404).json(error)
    }
})

module.exports = router;
