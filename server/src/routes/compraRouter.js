const { Router } = require("express");
const compraRouter = Router();
const { Producto, Cliente, Compra, Review, Compra_Producto } = require("../db");
const { validateAdmin } = require("./middleware/validateAdmin");
const { validateAccessToken } = require("./middleware/validateAccessToken");
const { errorHandler } = require("./middleware/error.middleware");
const nodemailer = require("nodemailer");
const { DATE } = require("sequelize");
require("dotenv").config();
const { EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT, EMAIL_USER } = process.env;

compraRouter.post("/", async (req, res) => {
  try {
    const { email, productos, input } = req.body;

    const { nombre, apellido, DNI } = input;

    // console.log(nombre, apellido, DNI, productos);

    const cliente = await Cliente.findOne({
      where: { email: email },
    });

    if (!cliente)
      throw new Error("El cliente no se encuentra en la base de datos");

    const nuevaCompra = await Compra.create({ raw: true });
    nuevaCompra.clienteId = cliente.id;
    nuevaCompra.direccion = input.direc;
    nuevaCompra.cel = input.cel;
    nuevaCompra.cp = input.cp;
    nuevaCompra.ciudad = input.ciudad;
    nuevaCompra.nombre = nombre;
    nuevaCompra.apellido = apellido;
    nuevaCompra.DNI = DNI;
    nuevaCompra.save();

    productos.forEach(async (producto) => {
      const foundProduct = await Producto.findByPk(producto.id);
      nuevaCompra.addProducto(foundProduct, {
        through: { cantidad: producto.cantidad },
      });
    });
    res.status(200).json("Compra creada");
  } catch (error) {
    res.status(400).json({ error: true, msg: error.message });
  }
});

compraRouter.post("/obtenerId", async (req, res) => {
  const { User } = req.body;
  try {
    ///hacemos una busqueda de cliente cuyo nickname sea el igual al que llego por body desde el front
    const usuario = await Cliente.findOne({
      where: {
        nickname: User,
      },
    });

    ///devolvemos la propiedad id de la constante usuario en la base de datos
    res.send(usuario.dataValues.id);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

compraRouter.post("/historial", async (req, res) => {
  try {
    const { clienteId } = req.body;

    // busco el cliente con el clienteId que me llega por body
    // con el metodo includes incluyo todas las compras que este realizo
    const cliente = await Cliente.findAll({
      where: {
        id: clienteId,
      },
      include: Compra,
    });

    //guardo todas las compras del cliente en la constante compras
    const compras = cliente[0].dataValues.Compras;

    //obtengo todos los id de las compras y los guardo en la contante Arr
    const Arr = [];

    compras.forEach((elem) => {
      Arr.push(elem.dataValues);
    });

    //recorremos el arreglo Arr con la info de la compras
    //en cada iteracion obtenemos la relacion Compra_Producto pasandole elem.id para que encuentre la relacion
    //recorremos cada uno de los indices de result(todas las compras que realizo el usuario)
    //obtenemos la informacion del producto y la compra con los id que nos provee cada iteracion de result
    //y luego creamos un objeto con toda la informacion necesaria y la pusheamos al arreglo arregloDeCompras para que luego se envie como respuesta
    let arregloDeCompras = [];
    let idFront = 1;
    Arr.forEach(async (elem) => {
      const result = await Compra_Producto.findAll({
        where: { CompraId: elem.id },
      });
      // console.log(result);

      result.forEach(async (elem) => {
        const producto = await Producto.findByPk(elem.dataValues.productoId);
        const compra = await Compra.findByPk(elem.dataValues.CompraId);

        let obj = {};

        obj.nombre = producto.dataValues.nombre;
        obj.URL = producto.dataValues.URL;
        obj.precio = producto.dataValues.precio;
        obj.color = producto.dataValues.color;
        obj.talla = producto.dataValues.talla;
        obj.id = producto.dataValues.id;
        obj.marca = producto.dataValues.marca;
        obj.estado = compra.dataValues.enviado;
        obj.fecha = new Date(compra.dataValues.fecha).toLocaleDateString();
        obj.localizador = compra.dataValues.localizador;
        obj.idFront = idFront++;
        obj.cantidad = elem.dataValues.cantidad;

        arregloDeCompras.push(obj);
      });
    });

    setTimeout(() => {
      const respuestaFinal = arregloDeCompras.sort((a, b) => {
        const A = a.fecha.split("/");
        const B = b.fecha.split("/");

        if (parseInt(A[1]) < parseInt(B[1])) return 1;

        if (parseInt(A[1]) > parseInt(B[1])) return -1;

        if (parseInt(A[1]) === parseInt(B[1])) {
          if (parseInt(A[0]) < parseInt(B[0])) return 1;
          if (parseInt(A[0]) > parseInt(B[0])) return -1;
          return 0;
        }
      });

      console.log(respuestaFinal);
      res.status(200).json(respuestaFinal);
      return;
    }, "100");
  } catch (error) {
    res.status(400).json(error.message);
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
            ciudad: purchase.ciudad,
            direccion: purchase.direccion,
            cel: purchase.cel,
            cp: purchase.cp,
            nombre: purchase.nombre,
            apellido: purchase.apellido,
            dni: purchase.DNI,
          },
          productos: mappedProducts,
        });
      });

      // console.log("********************************");
      // console.log(mappedPurchases);

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
        text: `Ya ha sido confirmado el envío del producto, le enviamos el siguiente número Localizador para seguirlo: ${trackingNumber}.`,
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
  // no agregaré Auth
  // verifica si el cliente ya dejó un review para un producto especifico.
  // De ser así, el product card de historial de compras no debería mostrar opción para dejar un review
  try {
    const { productoId, clienteId } = req.query;
    const review = await Review.findOne(
      { where: { productoId, clienteId } },
      { raw: true }
    );

    if (review)
      throw new Error("El cliente ya dejó una opinión para esta compra");

    return res
      .status(200)
      .json({ error: false, msg: "Aún no se ha dejado una opinión" });
  } catch (error) {
    return res.status(400).json({ error: true, msg: error.message });
  }
});

compraRouter.post("/review", async (req, res) => {
  // necesita validacion de usuario
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

compraRouter.post("/obtenerId", async (req, res) => {
  const { User } = req.body;

  try {
    ///hacemos una busqueda de cliente cuyo nickname sea el igual al que llego por body desde el front
    const usuario = await Cliente.findOne({
      where: {
        nickname: User,
      },
    });

    ///devolvemos la propiedad id de la constante usuario en la base de datos
    res.send(usuario.dataValues.id);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

compraRouter.get("/length", async () => {
  try {
    const compras = await Compra.findAll();
    const total = compras.length;
    res.status(200).json(total);
  } catch (error) {
    res.status(400).json({ error: true, msg: error.msg });
  }
});

// compraRouter.post("/historial", async (req, res) => {
//   try {
//     const { clienteId } = req.body;

//     // busco el cliente con el clienteId que me llega por body
//     // con el metodo includes incluyo todas las compras que este realizo
//     const cliente = await Cliente.findAll({
//       where: {
//         id: clienteId,
//       },
//       include: Compra,
//     });

//     //guardo todas las compras del cliente en la constante compras
//     const compras = cliente[0].dataValues.Compras;

//     //obtengo todos los id de las compras y los guardo en la contante Arr
//     const Arr = [];

//     compras.forEach((elem) => {
//       Arr.push(elem.dataValues);
//     });

//     //recorremos el arreglo Arr con la info de la compras
//     //en cada iteracion obtenemos la relacion Compra_Producto pasandole elem.id para que encuentre la relacion
//     //recorremos cada uno de los indices de result(todas las compras que realizo el usuario)
//     //obtenemos la informacion del producto y la compra con los id que nos provee cada iteracion de result
//     //y luego creamos un objeto con toda la informacion necesaria y la pusheamos al arreglo arregloDeCompras para que se envie como respuesta
//     let arregloDeCompras = [];
//     let totalDeIteraciones = 0;

//     Arr.forEach(async (elem) => {
//       const result = await Compra_Producto.findAll({
//         where: { CompraId: elem.id },
//       });

//       totalDeIteraciones = totalDeIteraciones + result.length;

//       result.forEach(async (elem) => {
//         const producto = await Producto.findByPk(elem.dataValues.productoId);
//         const compra = await Compra.findByPk(elem.dataValues.CompraId);

//         let obj = {};

//         (obj.nombre = producto.dataValues.nombre),
//           (obj.URL = producto.dataValues.URL),
//           (obj.precio = producto.dataValues.precio),
//           (obj.color = producto.dataValues.color),
//           (obj.talla = producto.dataValues.talla),
//           (obj.id = producto.dataValues.id),
//           (obj.marca = producto.dataValues.marca),
//           (obj.estado = compra.dataValues.enviado),
//           (obj.fecha = compra.dataValues.fecha),
//           (obj.localizador = compra.dataValues.localizador);

//         arregloDeCompras.push(obj);

//         if (arregloDeCompras.length === totalDeIteraciones)
//           res.status(200).json(arregloDeCompras);
//       });
//     });
//     // console.log(arregloDeCompras);
//     // res.status(200).json(arregloDeCompras);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// });

compraRouter.use(errorHandler);

module.exports = compraRouter;