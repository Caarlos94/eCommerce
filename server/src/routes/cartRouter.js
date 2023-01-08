const { Router } = require("express");
const cartRouter = Router();
const { Cliente, Producto, Carrito } = require("../db");

cartRouter.post("/", async (req, res) => {
  try {
    const { email, productoId } = req.body;
    const cliente = await Cliente.findOne({
      where: { email },
    });
    const producto = await Producto.findByPk(productoId);
    // console.log(cliente, producto.id);
    cliente.addProducto(producto);
    return res.status(200).json("se añadio al carrito");
  } catch (error) {
    res.status(400).json({ error: true, msj: error.message });
  }
});

cartRouter.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const cliente = await Cliente.findOne({ where: { email }, raw: true });
    const clienteId = cliente.id;
    const productos = [];
    const carrito = await Carrito.findAll({
      where: { clienteId },
      raw: true,
    });

    for (let i in carrito) {
      const producto = await Producto.findByPk(carrito[i].productoId, {
        raw: true,
      });
      productos.push(producto);
    }

    return res.status(200).json({ productos, clienteId });
  } catch (error) {
    res.status(400).json({ error: true, msj: error.message });
  }
});

cartRouter.delete("/:clienteId/:productoId", async (req, res) => {
  try {
    const { clienteId, productoId } = req.params;
    const carrito = await Carrito.findOne({
      where: { clienteId, productoId },
    });
    console.log(carrito);
    if (!carrito) throw new Error("No existe una coincidencia");
    carrito.destroy();
    res
      .status(200)
      .json({
        error: false,
        msj: "El producto fue eliminado del carrito",
      });
  } catch (error) {
    res.status(400).json({ error: true, msj: error.message });
  }
});

module.exports = cartRouter;
