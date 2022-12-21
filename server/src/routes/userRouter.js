const { Router } = require('express')
const { Cliente } = require('../db.js');
const { getDataBaseClient } = require("./functions")
const userRouter = Router()

userRouter.post("/", async (req, res) => {
    try {
        const data = req.body;
        // const { product } = req.body 
        const newUser = await Cliente.create(data)
        // const DatabaseCategory = await Categoria.findAll({ where: { nombre: categoria } })
        // await newProduct.addCategoria(DatabaseCategory)
        res.status(200).json(newUser) 
    } catch (error) {  
        res.status(400).json(error.message)
    }
})

userRouter.get('/', async (req, res) => {
    try {
      let clientesDB = await getDataBaseClient();
      res.status(200).json(clientesDB);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });


module.exports = userRouter