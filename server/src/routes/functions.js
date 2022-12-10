const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Categoria, Producto } = require('../db.js');

// Get categories FROM firebase and save then into DB
const getCategories = async () => {
  const response = await fetch(
    'https://supra-sports-default-rtdb.firebaseio.com/.json'
  );
  let commits = await response.json();
  let category = commits.Productos.map((e) => e.categoria);
  const categoryArr = new Set(category);
  let result = [...categoryArr];
  result.forEach(async (e) => {
    Categoria.findOrCreate({ where: { nombre: e } });
  });
  return result;
};

// Get products FROM firebase and save then into DB
const getProducts = async () => {
  let response = await fetch(
    `https://supra-sports-default-rtdb.firebaseio.com/.json`
  );
  let commits = await response.json();
  // commits.Productos.forEach(async (e) => {
  //     await Producto.findOrCreate({where: { nombre:e.nombre, URL: e.URL, color: e.color, marca: e.marca, talla: e.talla, precio: e.precio }})
  // })
  return commits;
};

// Get Created Products from DB
const getDataBaseProducts = async () => {
  const allProductsDB = await Producto.findAll({
    include: {
      model: Categoria,
      attributes: ['nombre'],
      through: { attributes: [] },
    },
  });
  allProductsDB.forEach((e) => {
    let newArr = e.dataValues.categoria.map((e) => e.nombre);
    e.dataValues.categoria = newArr.join(', ');
  });
  return allProductsDB;
};

module.exports = {
  getProducts,
  getCategories,
  getDataBaseProducts,
};
