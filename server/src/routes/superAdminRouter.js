const { Router } = require("express");
const superAdminRouter = Router();
const { fetchManagementToken } = require("./middleware/fetchManagementToken");
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
      const { data } = req.body;
      const { email, idType } = data;
      const user = await Cliente.findOne({ where: { email }, raw: true });
      if (!user)
        throw new Error(
          `El usuario ${email} debe autenticarse con ${idType} para habilitar asignacion de roles por ese medio`
        );
      if (!user[idType])
        throw new Error(
          `El usuario ${email} debe autenticarse con ${idType} para habilitar asignacion de roles por ese medio`
        );

      const id = user[idType];
      // hacer request de add user
      var options = {
        method: "POST",
        url: `${AUTH0_DOMAIN}/api/v2/users/${id}/roles`,
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
          res
            .status(200)
            .json(
              `El usuario ${email} ha recibido el rol de admin con ${idType}`
            );
        })
        .catch(function (error) {
          return res.status(400).json({ error: true, msg: error.message });
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
    } catch (error) {}
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
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        res.status(400).json({ error: true, msg: error.msg });
      });
  } catch (error) {
    res.status(400).json({ error: true, msg: error.msg });
  }
});

module.exports = superAdminRouter;
