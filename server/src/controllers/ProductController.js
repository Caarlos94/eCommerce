const axios = require("axios");

const {
  Producto,
  Categoria,
  Image,
  Color,
  Size,
  Producto_Color,
  Producto_Size,
} = require("../db");

const setProductDefaultData = async (req, res) => {
  try {
    axios
      .get("https://suprastore-8cd78-default-rtdb.firebaseio.com/.json")
      .then((response) =>
        response.data.Productos.forEach(async (el) => {
          const addedProduct = await Producto.findOrCreate({
            where: {
              nombre: el.nombre,
              marca: el.marca,
              precio: el.precio,
            },
          });

          /*----------------- Agregando imagenes y relacion -------------------*/

          // verificacion adicional ya que el firebase json no está actualizado. (El key de todas las propiedades URL deberia ser un array)
          if (Array.isArray(el.URL)) {
            el.URL.forEach((img) =>
              addedProduct[0].createImage({ nombre: img })
            );
          } else {
            addedProduct[0].createImage({ nombre: el.URL });
          }

          /*----------------- Agregando relacion de categorias ----------------*/

          const matchingCategory = await Categoria.findOne({
            where: { nombre: el.categoria },
          });

          addedProduct[0].addCategoria(matchingCategory);

          /*----------------- Agregando relacion de colores -------------------*/
          // verificacion adicional ya que el firebase json no está actualizado. (El key de todas las propiedades color deberia ser un array)

          if (Array.isArray(el.color)) {
            el.color.forEach(async (color) => {
              let matchingColor = await Color.findOne({
                where: {
                  nombre:
                    color.charAt(0).toUpperCase() +
                    color.slice(1).toLowerCase(),
                },
              });

              addedProduct[0].addColor(matchingColor);
            });
          } else {
            const matchingColor = await Color.findOne({
              where: {
                nombre:
                  el.color.charAt(0).toUpperCase() +
                  el.color.slice(1).toLowerCase(),
              },
            });

            addedProduct[0].addColor(matchingColor);
          }

          /*----------------- Agregando relacion de tallas -------------------*/
          // verificacion adicional ya que el firebase json no está actualizado. (El key de todas las propiedades talla deberia ser un array)
          if (Array.isArray(el.talla)) {
            el.talla.forEach(async (size) => {
              let matchingSize = await Size.findOne({
                where: {
                  nombre: size.toString(),
                },
              });

              addedProduct[0].addSize(matchingSize);
            });
          }
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
        { model: Color, through: { attributes: [] } },
        { model: Size, through: { attributes: [] } },
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

      product.Images.forEach((img) =>
        imagesArr.push({ id: img.id, nombre: img.nombre })
      );

      let colorsArr = [];

      product.Colors.forEach((color) => {
        colorsArr.push({ id: color.id, nombre: color.nombre });
      });

      let sizesArr = [];

      product.Sizes.forEach((size) => {
        sizesArr.push({ id: size.id, nombre: size.nombre });
      });

      formattedProducts.push({
        id: product.id,
        nombre: product.nombre,
        URL: imagesArr,
        precio: product.precio,
        color: colorsArr,
        talla: sizesArr,
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
    const { id } = req.params;
    const { nombre, URL, precio, color, talla, marca, categoria } = req.body;

    Producto.findByPk(parseInt(id), {
      include: [{ model: Categoria, attributes: ["nombre"] }],
    })
      .then((product) => {
        product.nombre = nombre ? nombre : product.nombre;
        product.precio = precio ? precio : product.precio;
        product.marca = marca ? marca : product.marca;

        product.save();
      })
      .catch((error) => error);

    const category = await Categoria.findOne({ where: { nombre: categoria } });

    const product = await Producto.findByPk(parseInt(id));

    await product.setCategoria(category.id);

    //elimina colores preexistentes

    let productoColors = await Producto_Color.findAll({
      where: { ProductoId: parseInt(id) },
    });
    productoColors.forEach((entry) => entry.destroy());

    //agrega colores recibidos

    color.forEach(async (color) => {
      const matchingColor = await Color.findOne({
        where: { nombre: color },
      });
      product.addColor(matchingColor);
    });

    //elimina tallas preexistentes

    let productSizes = await Producto_Size.findAll({
      where: { ProductoId: parseInt(id) },
    });
    productSizes.forEach((entry) => entry.destroy());

    res.status(200).json("Product updated successfully");

    //agrega tallas recibidas

    talla.forEach(async (talla) => {
      const matchingSize = await Size.findOne({
        where: { nombre: talla },
      });
      product.addSize(matchingSize);
    });

    return;
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { setProductDefaultData, getProducts, updateProduct };
