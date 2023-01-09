const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { Categoria, Producto, Cliente, Images } = require('../db.js');
 
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
  let response = await fetch(
    `https://supra-sports-default-rtdb.firebaseio.com/.json`
  ); 
  let commits = await response.json();
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

      let DatabaseImage = await Images.findOne({
        where: { nombre: e.nombre },
      });
      await instance.addImage(DatabaseImage)
  })

  let allProductsDB = await Producto.findAll({ 
    include: [
    {
      model: Categoria,
      attributes: ["nombre"], 
      through: { attributes: [] }, 
    },
    { 
      model: Images, 
      attributes: ["URL"],
    } 
  ]})  

    allProductsDB.forEach(async (e) => {
    let arrCat = e.dataValues.categoria.map((e) => e.nombre);
    e.dataValues.categoria = arrCat.join(", ");

    // let arrImg = e.dataValues.images.map((e) => e.URL)
    // console.log(e.dataValues);
    // e.dataValues.images = arrImg.join(", ");
   });

  return allProductsDB 
};
  
// Get Created Products from DB
// const getDataBaseProducts = async () => {
//   // await getProductsFireBase() 
//   let allProductsDB = await Producto.findAll({
//     include: [
//     {
//       model: Categoria,
//       attributes: ["nombre"], 
//       through: { attributes: [] }, 
//     },
//     { 
//       model: Images, 
//       attributes: ["URL"],
//     } 
//   ], 
//   }); 

//   // allProductsDB.forEach(async (e) => {
//   //   let newArr = e.dataValues.categoria.map((e) => e.nombre);
//   //   e.dataValues.categoria = newArr.join(", ");
//   // });

//   return allProductsDB;
// };

const getDataBaseClient = async () => {
  const allClientDB = await Cliente.findAll();
  return allClientDB;
};

// Get images FROM firebase and save then into DB
const getImages = async () => {
    const response = await fetch( 'https://supra-sports-images-default-rtdb.firebaseio.com/.json' );
    let commits = await response.json();

    commits.Imagenes.forEach(async (img) => {
      await Images.findOrCreate({ where: { nombre: img.nombre },
        defaults: { 
          URL: img.URL
        }
      })});

      let imagesDB = await Images.findAll() 
      return imagesDB
}; 
 
module.exports = {  
  getProductsFireBase,
  getCategories,
  // getDataBaseProducts,
  getDataBaseClient,
  getImages
};
