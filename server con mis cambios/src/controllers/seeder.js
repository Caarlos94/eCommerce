const axios = require("axios");
const { Categoria, Size, /*Color,*/ Producto } = require("../db");

const seeder = () => {
  axios
    .get("https://suprastore-8cd78-default-rtdb.firebaseio.com/.json")
    .then((res) => {
      let categories = res.data.Productos.map((p) => p.categoria);
      categories = new Set(categories);
      categories.forEach(async (c) => {
        await Categoria.findOrCreate({ where: { nombre: c } });
      });

      // Tal vez no sea necesario si ya se está filtrando en el front. Tienes tallas por número y por letra

      let sizes = [];
      sizes.push("XXS", "XS", "S", "M", "L", "XL", "XXL");

      // foreach innecesario
      res.data.Productos.map((p) =>
        p.talla.forEach((el) => sizes.push(el.talla))
      );

      sizes = sizes.flat();
      sizes = new Set(sizes);
      sizes.forEach(async (size) => {
        if (!!isNaN(size)) {
          size = size.toUpperCase();
        }
        await Size.findOrCreate({ where: { nombre: size.toString() } });
      });
    })
    .then(seederFetchProductTest());
};

const seederFetchProductTest = async () => {
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
              color: el.color,
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

          /*----------------- Agregando relacion de tallas -------------------*/
          // verificacion adicional ya que el firebase json no está actualizado. (El key de todas las propiedades talla deberia ser un array)
          if (Array.isArray(el.talla)) {
            el.talla.forEach(async (size) => {
              let matchingSize = await Size.findOne({
                where: {
                  nombre: size.talla,
                },
              });
              addedProduct[0].addSize(matchingSize, {
                through: { stock: size.stock },
              });
            });
          }
        })
      );

    return;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { seeder, seederFetchProductTest };
