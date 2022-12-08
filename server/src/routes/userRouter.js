const { Router } = require('express')
const userRouter = Router()

userRouter.post("/", async (req, res) => {
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

module.exports = userRouter