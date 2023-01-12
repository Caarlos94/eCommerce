const { Router } = require("express");
const productRouter = Router();
const { getDataBaseProducts, getProductsFireBase } = require("./functions");
const { Categoria, Producto } = require("../db.js");
const { validateAdmin } = require("./middleware/validateAdmin");
const { validateAccessToken } = require("./middleware/validateAccessToken");
const { errorHandler } = require("./middleware/error.middleware");

productRouter.get("/", async (req, res) => {
  try {
    await getProductsFireBase()
    await getProductsFireBase()
    res.status(200).json(await getDataBaseProducts());
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

// admins only
productRouter.post(
  "/",
  validateAccessToken,
  validateAdmin,
  async (req, res) => {
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
  }
);

// admins only
productRouter.delete(
  "/:id",
  validateAccessToken,
  validateAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Producto.findByPk(id);

      await product.destroy();
      res.status(200).json(product);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

// admins only
productRouter.put(
  "/:id",
  validateAccessToken,
  validateAdmin,
  async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const { categoria } = req.body;

    const producto = await Producto.findOne({
      where: { id: id }
    });
    try {
      let productoUp = await Producto.update({
        nombre: data.nombre || producto.nombre,
        URL: data.URL || producto.URL,
        precio: data.precio || producto.precio,
        color: data.color || producto.color,
        talla: data.talla || producto.talla,
        marca: data.marca || producto.marca,
        stock: data.stock || producto.stock,
      },
        { where: { id: id } }
      );
      if (categoria) {
        const DatabaseCategory = await Categoria.findAll({
          where: { nombre: categoria },
        });
        let newProd = await Producto.findOne({ where: { id: id } })

        await newProd.setCategoria(DatabaseCategory);
        console.log(newProd);
      }+
      res.status(200).send("el producto se modificó");
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

module.exports = productRouter;
