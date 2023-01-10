const { Router } = require('express');
const favoritosRouter = Router();
const { Cliente, Producto, Favorito } = require('../db');

favoritosRouter.post('/', async (req, res) => {
  try {
    const { email, productoId } = req.body;

    if (!email || !productoId) throw new Error("Se enviaron datos incorrectos");

    const cliente = await Cliente.findOne({
      where: { email },
    });
    const producto = await Producto.findByPk(productoId);
    // console.log(cliente, producto.id);
    cliente.addProducto(producto);
    return res.status(200).json('se añadio a favoritos');
  } catch (error) {
    res.status(400).json({ error: true, msj: error.message });
  }
});

favoritosRouter.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const cliente = await Cliente.findOne({ where: { email }, raw: true });
    //   console.log(clienteId);
    // console.log(cliente);
    const clienteId = cliente.id;
    const productos = [];
    const favoritos = await Favorito.findAll({
      where: { clienteId },
      raw: true,
    });

    for (let i in favoritos) {
      const producto = await Producto.findByPk(favoritos[i].productoId, {
        raw: true,
      });
      productos.push(producto);
    }

    return res.status(200).json({ productos, clienteId });
  } catch (error) {
    res.status(400).json({ error: true, msj: error.message });
  }
});

favoritosRouter.delete('/:clienteId/:productoId', async (req, res) => {
  try {
    const { clienteId, productoId } = req.params;
    const favorito = await Favorito.findOne({
      where: { clienteId, productoId },
    });
    // console.log(favorito);
    if (!favorito) throw new Error("No existe una coincidencia");
    favorito.destroy();
    res.status(200).json({
      error: false,
      msj: "El producto fue eliminado de los favoritos",
    });
  } catch (error) {
    res.status(400).json({ error: true, msj: error.message });
  }
});

module.exports = favoritosRouter;