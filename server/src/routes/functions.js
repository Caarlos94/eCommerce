const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Categoria, Producto, Cliente } = require('../db.js');
 
// Get categories FROM firebase and save then into DB
const getCategories = async () => {
  const a = await Categoria.findAll();
  if(a.length === 0) {
    const response = await fetch( 'https://supra-sports-default-rtdb.firebaseio.com/.json' );
    let commits = await response.json();
     
    let category = commits.Productos.map((e) => e.categoria);
    const categoryArr = new Set(category);
    let result = [...categoryArr]; 

    result.forEach(async (e) => { 
      const [category, created] = await Categoria.findOrCreate({ where: { nombre: e } });
    });
  
    let allCategoriesDb = await Categoria.findAll(); 
    allCategoriesDb = allCategoriesDb.map(obj => obj.nombre)
    return allCategoriesDb;
 
  } else {
    let allCategoriesDb = await Categoria.findAll();
    allCategoriesDb = allCategoriesDb.map(obj => obj.nombre)
    return allCategoriesDb
  }
};

// Get products FROM firebase and save then into DB
const getProductsFireBase = async () => {
  const a = await Producto.findAll();
  if(a.length === 0) {
  let response = await fetch(
    `https://supra-sports-default-rtdb.firebaseio.com/.json`
  ); 
  let commits = await response.json();
  console.log(commits);
    commits.Productos.forEach(async (e) => {
      const [instance, created] = await Producto.findOrCreate({where: { nombre:e.nombre }, 
        defaults: {
          URL: e.URL,
          color: e.color,
          marca: e.marca, 
          talla: e.talla,
          precio: e.precio, 
          stock: e.stock,
        }  
      }) 
      let DatabaseCategory = await Categoria.findOne({
        where: { nombre: e.categoria },
      });
      await instance.addCategoria(DatabaseCategory)
  })

  let allProductsDB = await Producto.findAll({ 
    include: [
    {
      model: Categoria,
      attributes: ["nombre"], 
      through: { attributes: [] }, 
    },
  ]})  

    allProductsDB.forEach(async (e) => {
    let arrCat = e.dataValues.categoria.map((e) => e.nombre);
    e.dataValues.categoria = arrCat.join(", ");
   });

  return allProductsDB 
  } else {
    let allProductsDb = await Producto.findAll();
    // allProductsDb = allProductsDb.map(obj => obj.nombre)
    return allProductsDb
  }
};

const getDataBaseClient = async () => {
  const allClientDB = await Cliente.findAll();
  return allClientDB;
}; 
 
module.exports = {  
  getProductsFireBase,
  getCategories,
  // getDataBaseProducts,
  getDataBaseClient,
};
