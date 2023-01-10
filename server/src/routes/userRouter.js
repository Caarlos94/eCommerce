const { Router } = require("express");
const { Cliente } = require("../db.js");
const { getDataBaseClient } = require("./functions");
const userRouter = Router();

userRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    // const { product } = req.body
    // const newUser = await Cliente.create(data)
    console.log(data);
    const { sub } = data;

    const [instance, created] = await Cliente.findOrCreate({
      where: { email: data.email },
      defaults: {
        nickname: data.nickname,
        email: data.email,
        picture: data.picture,
      },
    });

    if (sub.includes("google-oauth2")) {
      instance.googleId = sub;
    }

    if (sub.includes("auth0")) {
      instance.auth0Id = sub;
    }

    instance.save();

    // const DatabaseCategory = await Categoria.findAll({ where: { nombre: categoria } })
    // await newProduct.addCategoria(DatabaseCategory)
    res.status(200).json(instance);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// userRouter.put("/", async(req, res) => {
//     const { direction } = req.body
//     const { value } = req.query
//     try {
//         const newCliente = await Cliente.update(
//             {[direction]: value},
//             {where:{[direction]:null}}
//         )
//         res.status(404).send(newCliente)
//     } catch (error) {
//         res.status(404).send(error.message)
//     }
// })

// userRouter.put("/:id", async (req, res) => {
//   const data = req.body;
//   // const { id } = req.params; 
//   console.log("*****************************************");
//   console.log(data);
//   const cliente = await Cliente.findOne({
//     where: { id: id }  
//   })
//   try {
//     const editedClient = await Cliente.update(
//       {
//         nickname: cliente.nickname,
//         email: cliente.email,
//         picture: cliente.picture, 
//         ciudad: data.ciudad,
//         cp: data.cp,
//         direccion: data.direccion,
//         celular: data.celular
//       },
//       { where: { id: id } }
//     );
//     res.status(200).send("el cliente se modificó");
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

userRouter.get('/', async (req, res) => {
  try {
    let clientesDB = await getDataBaseClient();
    res.status(200).json(clientesDB);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// userRouter.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     let clienteDB = await Cliente.findByPk(id);
//     res.status(200).json(clienteDB); 
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

userRouter.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const client = await Cliente.findByPk(id);
    await client.destroy();
    res.status(200).json(client);
  } catch (error) {
    res.status(404).send(error.message);
  }
});


module.exports = userRouter