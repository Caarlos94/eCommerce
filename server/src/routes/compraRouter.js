const { Router } = require("express");
const compraRouter = Router();
const { Producto, Cliente, Compra } = require("../db");

// Ejemplo de req.body:
// {
//   "clienteId":"32671d87-37bf-4014-af3c-bb6bd59a8f8d",
//   "productos":[
//     {
//       "prodId":"3d995950-86eb-11ed-b779-997a2f11ad2c",
//       "cantidad":1
//     },
//     {
//       "prodId":"3d99f590-86eb-11ed-b779-997a2f11ad2c",
//       "cantidad":1
//     }
//   ]
// }

compraRouter.post("/", async (req, res) => {
  try {
    const { clienteId, productos } = req.body;

    const cliente = await Cliente.findOne({
      where: {
        id: clienteId,
      },
    });

    if (!cliente) {
      throw new Error("El cliente no se encuentra en la base de datos");
    }

    const nuevaCompra = await Compra.create({ raw: true });

    nuevaCompra.clienteId = clienteId;
    nuevaCompra.save();

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
});

compraRouter.get("/adminPurchases/", async (req, res) => {
  try {
    const purchases = await Compra.findAll({ include: [Producto, Cliente] });

    const mappedPurchases = [];

    purchases.forEach((purchase) => {
      const mappedProducts = [];

      purchase.productos.forEach((producto) =>
        mappedProducts.push({
          productoId: producto.id,
          nombre: producto.nombre,
          url: producto.URL,
          precio: producto.precio,
          color: producto.color,
          talla: producto.talla,
          marca: producto.marca,
          stock: producto.stock,
          cantidad: producto.Compra_Producto.cantidad,
        })
      );

      mappedPurchases.push({
        purchaseId: purchase.id,
        enviado: purchase.enviado,
        localizador: purchase.localizador,
        fecha: purchase.fecha,
        cliente: {
          clienteId: purchase.cliente.id,
          nickname: purchase.cliente.nickname,
          email: purchase.cliente.email,
          address: purchase.cliente.direction,
          cel: purchase.cliente.cel,
          zipCode: purchase.cliente.cp,
        },
        productos: mappedProducts,
      });
    });
    return res.status(200).json(mappedPurchases);
  } catch (error) {
    res.status(400).json({ error: true, msg: error.message });
  }
});

module.exports = compraRouter;
