const axios = require("axios");
const { Categoria, Size, Color } = require("../db");

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

      let sizes = res.data.Productos.map((p) => p.talla);
      sizes = sizes.flat();
      sizes = new Set(sizes);
      sizes.forEach(async (size) => {
        if (!!isNaN(size)) {
          size = size.toUpperCase();
        }
        await Size.findOrCreate({ where: { nombre: size.toString() } });
      });

      // el seeder de color debe buscar todos los colores en los arrays

      let colors = res.data.Productos.map((p) => p.color);
      colors = colors.flat();
      colors = new Set(colors);
      colors.forEach(async (color) => {
        await Color.findOrCreate({
          where: {
            nombre:
              color.charAt(0).toUpperCase() + color.slice(1).toLowerCase(),
          },
        });
      });
    });
};

module.exports = { seeder };
