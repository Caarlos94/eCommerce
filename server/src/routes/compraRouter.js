const { Router } = require("express");
const compraRouter = Router();
const { Producto, Cliente, Compra, Compra_Producto } = require("../db");

// {clienteId:"e3d40d73-f6e1-4314-aacf-25919892852d", productos:[{prodId:"7ebe1230-86e2-11ed-9b4c-174d19eaa266", cantidad:1 }, {prodId:"7ebe6050-86e2-11ed-9b4c-174d19eaa266", cantidad:1 } ]}

compraRouter.post("/", async (req, res) => {
  try {
    const { clienteId, productos } = req.body;

    const cliente = await Cliente.findOne({
      where: {
        id: clienteId,
      },
    });

    const nuevaCompra = await Compra.create({ raw: true });

    nuevaCompra.clienteId = clienteId;
    await nuevaCompra.save();

    productos.forEach(async (producto) => {
      const foundProduct = await Producto.findByPk(producto.prodId);

      nuevaCompra.addProducto(foundProduct, {
        through: { cantidad: producto.cantidad },
      });
    });
    res.status(200).json("Compra creada");
  } catch (error) {
    res.status(400).json(error.message);
  }

  // encontrar el cliente
  // crear orden de compra con el cliente
  // agregar producto
});

module.exports = compraRouter;
