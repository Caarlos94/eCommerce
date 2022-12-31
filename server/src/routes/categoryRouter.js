const { Router } = require("express");
const categoryRouter = Router();
const { Categoria } = require('../db.js')
const { getCategories } = require("./functions");


categoryRouter.get("/", async (req, res) => {
    try {
        let categoria = await getCategories()
        res.status(200).json(categoria)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

categoryRouter.post('/', async (req, res) => {
    try {
        let nombre = req.body;
        let newCategory = await Categoria.create(nombre);

        res.status(200).json(newCategory)
    } catch (error) {
        res.status(404).send(error.message)
    }
});

categoryRouter.delete("/:nombre", async (req, res) => {
    try {
        let { nombre } = req.params;
        console.log(nombre);
        const category = await Categoria.findOne({
            where: {
                nombre
            },
        });
        console.log(category);
        await category.destroy();
        res.status(200).json(category);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = categoryRouter;