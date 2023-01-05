const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Categoria, Producto, Cliente } = require('../db.js');

// Get categories FROM firebase and save then into DB
const getCategories = async () => {
  const a = await Categoria.findAll();
  if (a.length === 0) {
    const response = await fetch('https://supra-sports-default-rtdb.firebaseio.com/.json');
    let commits = await response.json();

    let category = commits.Productos.map((e) => e.categoria);
    const categoryArr = new Set(category);
    let result = [...categoryArr];

    result.forEach(async (e) => {
      Categoria.findOrCreate({ where: { nombre: e } });
    });

    const allCategoriesDB = await Categoria.findAll();
    const allCat = allCategoriesDB.map(obj => obj.nombre)
    return allCat;
  } else {
    const allCategoriesDB = await Categoria.findAll();
    const allCat = allCategoriesDB.map(obj => obj.nombre)
    return allCat
  }
};

// Get products FROM firebase and save then into DB
const getProductsFireBase = async () => {
  const allProds = await Producto.findAll();
  if (allProds.length === 0) {
    let response = await fetch(
      `https://supra-sports-default-rtdb.firebaseio.com/.json`
    );
    let commits = await response.json();
    commits.Productos.forEach(async (e) => {
      const [instance, created] = await Producto.findOrCreate({
        where: { nombre: e.nombre },
        defaults: {
          URL: e.URL,
          color: e.color,
          marca: e.marca,
          talla: e.talla,
          precio: e.precio,
          stock: e.stock,
        }
      })
      const DatabaseCategory = await Categoria.findOne({
        where: { nombre: e.categoria },
      });
      await instance.addCategoria(DatabaseCategory)
    })
  } else {
    const allProds2 = await Producto.findAll();
    return allProds2;
  }
};

// Get Created Products from DB
const getDataBaseProducts = async () => {
  /* await getProductsFireBase() */
  const allProductsDB = await Producto.findAll({
    include: {
      model: Categoria,
      attributes: ["nombre"],
      through: { attributes: [] },
    },
  });

  allProductsDB.forEach(async (e) => {
    let newArr = e.dataValues.categoria.map((e) => e.nombre);
    e.dataValues.categoria = newArr.join(", ");
  });
  return allProductsDB;
};

const getDataBaseClient = async () => {
  const allClientDB = await Cliente.findAll();
  return allClientDB;
};

module.exports = {
  getProductsFireBase,
  getCategories,
  getDataBaseProducts,
  getDataBaseClient,
};
