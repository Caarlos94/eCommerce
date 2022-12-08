const { Router } = require('express')
const productRouter = Router()
const { getDataBaseProducts, getProducts } = require('./functions')
const { Categoria, Producto } = require("../db.js"); 

productRouter.get("/", async(req, res) => {
    try {
        let productos = await getDataBaseProducts()
        let getProduct = await getProducts()
        res.status(200).json(getProduct.Productos.concat(productos))
    } catch (error) {
       res.status(400).send(error.message) 
    }
}) 

productRouter.post("/", async (req, res) => {
    try {
        const data = req.body;
        const { categoria } = req.body 
        const newProduct = await Producto.create(data)
        const DatabaseCategory = await Categoria.findAll({ where: { nombre: categoria } })
        await newProduct.addCategoria(DatabaseCategory)
        res.status(200).json(newProduct)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

productRouter.delete("/", async(req, res) => {
    try {
        const { id } = req.body 
        const Producto = await Producto.findByPk(id)
        await poke.destroy()
        res.status(200)._construct.send(poke)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

productRouter.put("/:atributo", async(req, res) => {
    const { atributo } = req.params
    const { value } = req.query
    try {
        const newProduct = await Pokemon.update(
            {[atributo]: value},
            {where:{[atributo]:null}}
        )
        res.status(404).send(newProduct)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = productRouter;