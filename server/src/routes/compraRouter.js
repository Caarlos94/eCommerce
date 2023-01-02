const { Router } = require("express");
const compraRouter = Router();
const { Producto, Cliente, Compra, Review } = require("../db");
const { validateAdmin } = require("./middleware/validateAdmin");
const { validateAccessToken } = require("./middleware/validateAccessToken");
const { errorHandler } = require("./middleware/error.middleware");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT, EMAIL_USER } = process.env;

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
    res.status(400).json({ error: true, msg: error.message });
  }
});

compraRouter.get(
  "/adminSales/",
  validateAccessToken,
  validateAdmin,
  async (req, res) => {
    try {
      const { order, enviado } = req.query; // aceptar query para traer en orden ASC o DESC, también enviado false o true. TODOS LOS QUERIES VIENEN COMO STRING

      const purchases = await Compra.findAll({
        order: [["fecha", order || "DESC"]],
        include: [Producto, Cliente],
      });

      let mappedPurchases = [];

      purchases.forEach((purchase) => {
        let mappedProducts = [];

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
          fecha: new Date(purchase.fecha).toLocaleDateString(),
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

      if (enviado === "false") {
        mappedPurchases = mappedPurchases.filter(
          (purchase) => purchase.enviado === false
        );
      }

      if (enviado === "true") {
        mappedPurchases = mappedPurchases.filter(
          (purchase) => purchase.enviado === true
        );
      }

      return res.status(200).json(mappedPurchases);
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }
);

compraRouter.put(
  "/adminSales/:purchaseId",
  validateAccessToken,
  validateAdmin,
  async (req, res) => {
    try {
      const { purchaseId } = req.params;
      const { trackingNumber, clienteEmail } = req.body;

      console.log(clienteEmail);

      const purchase = await Compra.findOne(
        { where: { id: purchaseId } },
        { raw: true }
      );
      purchase.enviado = true;
      purchase.localizador = trackingNumber;
      purchase.save();

      let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "suprasportspf@outlook.com",
        to: clienteEmail,
        subject: "Confirmación de envío ",
        text: `Localizador: ${trackingNumber}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw new Error(error);
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json("El cliente ha sido notificado");
        }
      });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
);

compraRouter.get("/review-match", async (req, res) => {
  // verifica si el cliente ya dejó un review para un producto especifico.
  // De ser así, el product card de historial de compras no debería mostrar opción para dejar un review
  try {
    const { productoId, clienteId } = req.query;
    const review = await Review.findOne(
      { where: { productoId, clienteId } },
      { raw: true }
    );

    return res.status(200).json(review);
  } catch (error) {
    return res.status(400).json({ error: true, msg: error.message });
  }
});

compraRouter.post("/review", async (req, res) => {
  try {
    const { comment, rating, productoId, clienteId } = req.body;

    //Podría agregarse verificación de que el cliente si haya hecho la compra sobre la que va a opinar
    //La ruta post solo está disponible a través del product card de purchase history,
    //por lo que no es factible que un cliente pueda opinar sobre productos que no compró

    const match = await Review.findOne(
      { where: { productoId, clienteId } },
      { raw: true }
    );

    if (match) throw new Error("El cliente ya opinó sobre este producto");

    const cliente = await Cliente.findOne({
      where: {
        id: clienteId,
      },
    });

    const producto = await Producto.findOne({
      where: {
        id: productoId,
      },
    });

    if (!cliente) {
      throw new Error("El cliente no se encuentra en la base de datos");
    }

    if (!producto) {
      throw new Error("El producto no se encuentra en la base de datos");
    }

    const review = await Review.create({ comment, rating }, { raw: true });

    review.clienteId = clienteId;
    review.productoId = productoId;

    review.save();

    res.status(200).json("La opinión ha sido enviada.");
  } catch (error) {
    res.status(404).json({ error: true, msg: error.message });
  }
});

compraRouter.get("/reviews/:productoId", async (req, res) => {
  try {
    const { productoId } = req.params;
    const reviews = await Review.findAll(
      { where: { productoId } },
      { raw: true }
    );

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(400).json({ error: true, msg: error.message });
  }
});

compraRouter.use(errorHandler);

module.exports = compraRouter;
