const Category = ["Camperas", "Remeras", "Zapatillas", "Shorts", "Pantalones"];

const { Categoria } = require("../db");

const getCategories = async (req, res) => {
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
};

module.exports = { getCategories };
