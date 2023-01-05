const jwt_decode = require("jwt-decode");

const validateAdmin = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("Authorization not found");
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(" ")[1];

    let decoded = jwt_decode(bearerToken);

    if (!decoded.permissions.includes("read:admin")) {
      throw new Error("Permissions not valid");
    }
    next();
  } catch (error) {
    return res.status(403).json({ error: true, msg: error.message });
  }
};

module.exports = {
  validateAdmin,
};
