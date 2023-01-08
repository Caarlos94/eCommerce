// Debe usarse luego del middleware fetchManagementToken

const fetchAdmins = async (req, res, next) => {
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

    const response = await axios.request(options);
    res.locals.admins = await response.data;

    next();
  } catch (error) {
    return res.status(400).json({ error: true, msg: error.msg });
  }
};

module.exports = {
  fetchAdmins,
};
