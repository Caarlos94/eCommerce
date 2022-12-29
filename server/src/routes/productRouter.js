const { Router } = require("express");
const productRouter = Router();
const { getDataBaseProducts, getProductsFireBase } = require('./functions');
const { Categoria, Producto } = require('../db.js');


productRouter.get('/', async (req, res) => {
  try {
    await getProductsFireBase()
    let productos = await getDataBaseProducts();
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).send(error.message);
  } 
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  let prods = await getDataBaseProducts();
  /* let getProduct = await getProductsFireBase();
  
  const productos = await getProduct.Productos.concat(prods); */
  // console.log(prods);
  try {
    if (id) {
      let result = await prods.filter((p) => p.id == id);
      if (result.length) {
        let prod = result.map((r) => {
          return {
            id: r.id,
            nombre: r.nombre,
            URL: r.URL,
            marca: r.marca,
            precio: r.precio,
            color: r.color,
            categoria: r.categoria,
            talla: r.talla,
            stock: r.stock,
          };
        });
        res.status(200).json(prod);
      } else {
        res.status(400).json("No se encontro un producto con ese ID");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const data = req.body; 
    const { categoria } = req.body;
    const newProduct = await Producto.create(data);
    const DatabaseCategory = await Categoria.findAll({
      where: { nombre: categoria },
    });
    await newProduct.addCategoria(DatabaseCategory);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error.message); 
  }
});

productRouter.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Producto.findByPk(id);
    await product.destroy();
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// productRouter.put('/:stock', async (req, res) => {
//   const { stock } = req.params;
//   const { value } = req.query;
//   try {

//     const modifiedProduct = await Producto.update(
//       // { [stock]: value },
//       { [stock]: value },
//       { where: { [stock]: 25 } } );

//     res.status(200).send("Producto actualizado");
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

// productRouter.put('/', async (req, res) => {
//   try {

//     const { id } = req.body;
//     const product = await Producto.findByPk(id);
//     product.dataValues.stock--

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

productRouter.put("/:atributo", async (req, res) => {
  const { atributo } = req.params;
  const { value } = req.query;
  try {
    const newProduct = await Producto.update(
      { [atributo]: value },
      { where: { [atributo]: null } }
    );
    res.status(404).send(newProduct);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = productRouter;
