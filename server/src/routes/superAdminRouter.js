const { Router } = require("express");
const superAdminRouter = Router();
const { fetchManagementToken } = require("./middleware/fetchManagementToken");
const { fetchAdmins } = require("./middleware/fetchAdmins"); // solo puede usarse luego de fetchManagementToken
const axios = require("axios");
const { Cliente } = require("../db.js");
require("dotenv").config();
const { AUTH0_DOMAIN, ADMIN_ROLE_ID } = process.env;
const { errorHandler } = require("./middleware/error.middleware");
const { validateSuperAdmin } = require("./middleware/validateSuperAdmin");
const { validateAccessToken } = require("./middleware/validateAccessToken");

// agregar middleware de proteccion de token al haber implementado peticiones desde el front

superAdminRouter.post(
  "/addAdminRole",
  validateAccessToken,
  validateSuperAdmin,
  fetchManagementToken,
  async (req, res) => {
    try {
      const { managementToken } = res.locals;
      const { newAdmin } = req.body;
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
        data: { roles: [ADMIN_ROLE_ID] },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data); // no envia respuesta
          return res.status(200).json({
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
  validateAccessToken,
  validateSuperAdmin,
  fetchManagementToken,
  async (req, res) => {
    console.log("HERE!");
    try {
      let { managementToken } = res.locals;
      let idUsers = req.body;
      //  console.log(idUsers);
      for (let index in idUsers) {
        var options = {
          method: "DELETE",
          url: `${AUTH0_DOMAIN}/api/v2/users/${idUsers[index]}/roles`,
          headers: {
            "content-type": "application/json",
            "Accept-Encoding": "gzip,deflate,compress",
            authorization: `Bearer ${managementToken}`,
            "cache-control": "no-cache",
          },
          data: { roles: [ADMIN_ROLE_ID] },
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

superAdminRouter.get(
  "/fetchRoles",
  validateAccessToken,
  validateSuperAdmin,
  fetchManagementToken,
  async (req, res) => {
    try {
      const { managementToken } = res.locals;

      var options = {
        method: "GET",
        url: `${AUTH0_DOMAIN}/api/v2/roles/rol_6qqkVmqdgh583LhO/users`,
        headers: {
          "content-type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress",
          authorization: `Bearer ${managementToken}`,
          "cache-control": "no-cache",
        },
        data: { roles: [ADMIN_ROLE_ID] },
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
  }
);

// ruta fetchNonAdmins funcionará asumiendo que la tabla cliente mantenga un registo actualizado de los usuarios registrados en Auth0
// Nota: Mejorable. Innecesario hacerlo a partir de admins. Sería mejor traerlos directamente a partir de endpoint Auth0 /getUsers y verificar permissions admin
superAdminRouter.get(
  "/fetchNonAdmins",
  validateAccessToken,
  validateSuperAdmin,
  fetchManagementToken,
  fetchAdmins, // los trae de auth0
  async (req, res) => {
    try {
      const { admins } = res.locals;

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

superAdminRouter.get(
  "/getUsers",
  validateAccessToken,
  validateSuperAdmin,
  fetchManagementToken,
  async (req, res) => {
    try {
      let { blocked } = req.query;

      if (blocked) {
        blocked = JSON.parse(blocked);
      }

      const { managementToken } = res.locals;

      var options = {
        method: "GET",
        url: `${AUTH0_DOMAIN}/api/v2/users`,
        headers: {
          "content-type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress",
          authorization: `Bearer ${managementToken}`,
          "cache-control": "no-cache",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          response.data.forEach((user) => {
            if (user.user_id.includes("google")) {
              user.idType = "googleId";
            } else {
              user.idType = "auth0Id";
            }
          });
          ///

          if (!req.query.hasOwnProperty("blocked")) {
            return res.status(200).json(response.data);
          }

          if (blocked) {
            let blockedUsers = response.data.filter(
              (user) => user.blocked === true
            );
            return res.status(200).json(blockedUsers);
          }
          if (blocked === undefined) {
            return res.status(200).json(response.data);
          }

          if (blocked === false) {
            let nonBlockedUsers = response.data.filter((user) => {
              if (!user.hasOwnProperty("blocked") || !user.blocked) return user;
            });
            return res.status(200).json(nonBlockedUsers);
          }

          ///
        })
        .catch(function (error) {
          throw new Error(error);
        });
    } catch (error) {}
  }
);

superAdminRouter.post(
  "/blockUser",
  validateAccessToken,
  validateSuperAdmin,
  fetchManagementToken,
  async (req, res) => {
    try {
      const { managementToken } = res.locals;
      const { user, block } = req.body; // Pasa booleano. true bloqueará. false desbloqueará

      // console.log(req.body);

      const response = await axios.patch(
        `${AUTH0_DOMAIN}/api/v2/users/${user.user_id}`,
        {
          blocked: block,
        },
        {
          headers: {
            Authorization: `Bearer ${managementToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      if (block) {
        return res.status(200).json({
          error: false,
          msg: `Se ha bloqueado la autenticación de ${user.idType} para el usuario ${user.email}`,
        });
      }

      if (!block) {
        return res.status(200).json({
          error: false,
          msg: `Se ha desbloqueado la autenticación de ${user.idType} para el usuario ${user.email}`,
        });
      }
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  }
);

superAdminRouter.use(errorHandler);

module.exports = superAdminRouter;