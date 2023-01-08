const { Router } = require("express");
const superAdminRouter = Router();
const { fetchManagementToken } = require("./middleware/fetchManagementToken");
const { fetchAdmins } = require("./middleware/fetchAdmins"); // solo puede usarse luego de fetchManagementToken

const axios = require("axios");
const { Cliente } = require("../db.js");
require("dotenv").config();
const { AUTH0_DOMAIN } = process.env;

// agregar middleware de proteccion de token al haber implementado peticiones desde el front

superAdminRouter.post(
  "/addAdminRole",
  fetchManagementToken,
  async (req, res) => {
    try {
      const { managementToken } = res.locals;
      const { newAdmin } = req.body;
      // const data = req.body;
      // const { email, idType } = data;
      // const user = await Cliente.findOne({ where: { email }, raw: true });
      // if (!user)
      //   throw new Error(
      //     `El usuario ${email} debe autenticarse con ${idType} para habilitar asignacion de roles por ese medio`
      //   );
      // if (!user[idType])
      //   throw new Error(
      //     `El usuario ${email} debe autenticarse con ${idType} para habilitar asignacion de roles por ese medio`
      //   );

      // const id = user[idType];

      // hacer request de add user
      var options = {
        method: "POST",
        url: `${AUTH0_DOMAIN}/api/v2/users/${newAdmin.id}/roles`,
        headers: {
          "content-type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress",
          authorization: `Bearer ${managementToken}`,
          "cache-control": "no-cache",
        },
        data: { roles: ["rol_6qqkVmqdgh583LhO"] },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data); // no envia respuesta
          return res
            .status(200)
            .json({
              error: false,
              msg: `El usuario ${newAdmin.email} ha recibido el rol de admin con ${newAdmin.idType}`,
            });
        })
        .catch(function (error) {
          throw new Error(error);
        });
    } catch (error) {
      res.status(400).json({ error: true, msg: error.message });
    }
  }
);

superAdminRouter.post(
  "/removeAdmin",
  fetchManagementToken,
  async (req, res) => {
    try {
      let { managementToken } = res.locals;
      let idUsers = req.body;

      //  console.log(idUsers);
      for (let index in idUsers) {
        var options = {
          method: "DELETE",
          url: `https://dev-62en868tsb2ut7tq.us.auth0.com/api/v2/users/${idUsers[index]}/roles`,
          headers: {
            "content-type": "application/json",
            "Accept-Encoding": "gzip,deflate,compress",
            authorization: `Bearer ${managementToken}`,
            "cache-control": "no-cache",
          },
          data: { roles: ["rol_6qqkVmqdgh583LhO"] },
        };
        axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            throw new Error(error);
          });
      }

      res.status(200).json({ msg: "usuarios eliminados de rol admin" });
    } catch (error) {
      res.status(400).json({ err: error.message });
    }
  }
);

superAdminRouter.get("/fetchRoles", fetchManagementToken, async (req, res) => {
  try {
    var axios = require("axios").default;
    const { managementToken } = res.locals;

    var options = {
      method: "GET",
      url: "https://dev-62en868tsb2ut7tq.us.auth0.com/api/v2/roles/rol_6qqkVmqdgh583LhO/users",
      headers: {
        "content-type": "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
        authorization: `Bearer ${managementToken}`,
        "cache-control": "no-cache",
      },
      data: { roles: ["rol_6qqkVmqdgh583LhO"] },
    };

    axios
      .request(options)
      .then(function (response) {
        return res.status(200).json(response.data);
      })
      .catch(function (error) {
        throw new Error(error);
      });
  } catch (error) {
    res.status(400).json({ error: true, msg: error.msg });
  }
});

// ruta fetchNonAdmins funcionará asumiendo que la tabla cliente mantenga un registo actualizado de los usuarios registrados en Auth0
superAdminRouter.get(
  "/fetchNonAdmins",
  fetchManagementToken,
  fetchAdmins, // los trae de auth0
  async (req, res) => {
    try {
      const { admins } = res.locals;
      // console.log(admins);
      const users = await Cliente.findAll({ raw: true });

      const mappedAdmins = admins.map((admin) => {
        let idType;

        if (admin.user_id.includes("google")) {
          idType = "googleId";
        } else {
          idType = "auth0Id";
        }

        return { email: admin.email, id: admin.user_id, idType };
      });

      const usersById = [];

      users.forEach((user) => {
        if (user.googleId) {
          usersById.push({
            email: user.email,
            id: user["googleId"],
            idType: "Autenticación de Google",
          });
        }

        if (user.auth0Id) {
          usersById.push({
            email: user.email,
            id: user["auth0Id"],
            idType: "Autenticación de Auth0",
          });
        }
      });

      const nonAdmins = [];

      usersById.forEach((user) => {
        let hasAdminRole = false;
        mappedAdmins.forEach((admin) => {
          if (admin.email === user.email && admin.id === user.id) {
            hasAdminRole = true;
          }
        });
        !hasAdminRole && nonAdmins.push(user);
      });

      return res.status(200).json(nonAdmins);
    } catch (error) {
      res.status(400).json({ error: true, msg: error.msg });
    }
  }
);

module.exports = superAdminRouter;
