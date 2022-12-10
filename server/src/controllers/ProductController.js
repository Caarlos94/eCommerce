const axios = require("axios");
const { CommandCompleteMessage } = require("pg-protocol/dist/messages");

const { Producto, Categoria, Image } = require("../db");

const setProductDefaultData = async (req, res) => {
  try {
    const categories = await Categoria.findAll();

    if (!categories.length) {
      throw new Error("Debe añadirse valores a la tabla de categorias");
    }

    axios
      .get("https://suprastore-8cd78-default-rtdb.firebaseio.com/.json")
      .then((response) =>
        response.data.Productos.forEach(async (el) => {
          const addedProduct = await Producto.findOrCreate({
            where: {
              nombre: el.nombre,
              color: el.color,
              marca: el.marca,
              precio: el.precio,
              talla: el.talla,
            },
          });
          if (Array.isArray(el.URL)) {
            el.URL.forEach((img) =>
              addedProduct[0].createImage({ nombre: img })
            );
          } else {
            addedProduct[0].createImage({ nombre: el.URL });
          }

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
    const categories = await Categoria.findAll();

    if (!categories.length) {
      throw new Error("Debe añadirse valores a la tabla de categorias");
    }

    const allProducts = await Producto.findAll({
      include: [
        { model: Categoria, through: { attributes: [] } },
        { model: Image },
      ],
      order: [["id", "ASC"]],
    });

    if (!allProducts.length) {
      return res
        .status(200)
        .json("Actualmente no hay productos en la base de datos");
    }

    let formattedProducts = [];

    for (let product of allProducts) {
      let imagesArr = [];

      product.Images.forEach((img) => imagesArr.push(img.nombre));

      formattedProducts.push({
        id: product.id,
        nombre: product.nombre,
        URL: imagesArr,
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
    res.status(404).json(error.message);
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

    res.status(200).json("Product updated successfully");

    return;
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { setProductDefaultData, getProducts, updateProduct };
