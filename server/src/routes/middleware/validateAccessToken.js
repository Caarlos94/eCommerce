const { auth } = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");

dotenv.config();

// El método config() cargará las variables de entorno definidas en nuestro archivo .env, para posteriormente cargar la 
// variable process.env con todas las variables de entorno.

const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

module.exports = {
  validateAccessToken,
};
