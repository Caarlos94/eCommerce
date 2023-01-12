const { Router } = require("express");
const productRouter = Router();
const { getDataBaseProducts, getProductsFireBase } = require("./functions");
const { Categoria, Producto, Images } = require("../db.js");

productRouter.get('/', async (req, res) => {
  try {
    await getProductsFireBase() 
    res.status(200).json(await getProductsFireBase());
    // res.status(200).json(await getDataBaseProducts());
  } catch (error) {
    res.status(400).send(error.message);
  } 
}); 

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  let productos = await getProductsFireBase();
  /* let getProduct = await getProductsFireBase();
  const productos = await getProduct.Productos.concat(prods); */
  // console.log(prods);
  try {
    if (id) {
      let result = await productos.filter((producto) => producto.id == id);
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
    // console.log(data);

    const newProduct = await Producto.create(data);
    const DatabaseCategory = await Categoria.findAll({
      where: { nombre: categoria },
    });
    await newProduct.addCategoria(DatabaseCategory);

    const newImage = await Images.create({
      nombre: data.nombre,
      // URL: data.URL 
    })
    // console.log(newImage);

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error.message);
  } 
});
 
productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Producto.findByPk(id);
    // console.log(id);
    // console.log(product);

    await product.destroy();
    res.status(200).json(product);
  } catch (error) { 
    res.status(404).send(error.message);
  }
});  

productRouter.put("/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const producto = await Producto.findOne({
    where: { id: id }
  })

  // console.log("********************************************");
  // console.log(data);
  // console.log("********************************************");
  // console.log(producto);
  // console.log("********************************************");

  try {

    let productoUp = await Producto.update({
        nombre: data.nombre || producto.nombre,
        URL: data.URL[0] || producto.URL[0],
        precio: data.precio || producto.precio,
        color: data.color || producto.color,
        talla: data.talla || producto.talla,
        marca: data.marca || producto.marca,
        stock: data.stock || producto.stock,
      },
      { where: { id: id } }
    );

    // console.log("UPDATE1");
    // console.log(productoUp);
    // console.log(producto.nombre);

    // let im = await Images.update({
    //     // nombre: producto.nombre,
    //     nombre: nombre.data,
    //     URL: [data.URL, data.URL, data.URL]
    //   },
    //   { where: { nombre: producto.nombre } }
    // )

    // console.log("UPDATE2");
    // console.log(productoUp);
    // console.log(im);
    
    res.status(200).send("el producto se modificó");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = productRouter;