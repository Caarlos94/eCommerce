const axios = require("axios");

const { Producto, Categoria } = require("../db");

const fillWithFirebaseData = async (req, res) => {
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

          const matchingCategory = await Categoria.findOne({
            where: { nombre: el.categoria },
          });

          addedProduct[0].addCategoria(matchingCategory);
        })
      );

    res.status(200).json("Dummy data posted to database");
    return;
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const allProducts = await Producto.findAll({
      include: { model: Categoria, through: { attributes: [] } },
      order: [["id", "ASC"]],
    });

    let formattedProducts = [];

    for (let product of allProducts) {
      formattedProducts.push({
        id: product.id,
        nombre: product.nombre,
        URL: product.URL,
        precio: product.precio,
        color: product.color,
        talla: product.talla,
        marca: product.marca,
        categoria: product.Categoria[0].nombre,
      });
    }

    res.status(200).json(formattedProducts);
    return;
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, nombre, URL, precio, color, talla, marca, categoria } =
      req.body;

    await Producto.findByPk(parseInt(id), {
      include: [{ model: Categoria, attributes: ["nombre"] }],
    })
      .then((product) => {
        product.nombre = nombre ? nombre : product.nombre;
        product.URL = URL ? URL : product.URL;
        product.precio = precio ? precio : product.precio;
        product.color = color ? color : product.color;
        product.talla = talla ? talla : product.talla;
        product.marca = marca ? marca : product.marca;

        product.save();
      })
      .catch((error) => error);

    const category = await Categoria.findOne({ where: { nombre: categoria } });

    const product = await Producto.findByPk(parseInt(id));

    await product.setCategoria(category.id);

    const updatedProduct = await product.getCategoria();

    console.log(updatedProduct);

    // También podría usarse update o set
    res.status(200).json("product");

    return;
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { fillWithFirebaseData, getProducts, updateProduct };
