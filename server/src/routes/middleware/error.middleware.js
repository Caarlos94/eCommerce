const {
  InvalidTokenError,
  UnauthorizedError,
} = require("express-oauth2-jwt-bearer");

const errorHandler = (error, request, response, next) => {
  if (error instanceof InvalidTokenError) {
    const message = "Bad credentials";

    response.status(error.status).json({ error: true, msg: message });

    return;
  }

  if (error instanceof UnauthorizedError) {
    const message = "Requires authentication";

    response.status(error.status).json({ error: true, msg: message });

    return;
  }

  const status = 500;
  const message = "Internal Server Error";

  response.status(status).json({ error: true, msg: message });
};

module.exports = {
  errorHandler,
};
