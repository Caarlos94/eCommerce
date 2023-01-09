const axios = require("axios");
require("dotenv").config();
const { CLIENT_ID, CLIENT_SECRET, AUTH0_DOMAIN } = process.env;

const fetchManagementToken = async (req, res, next) => {
  const data = JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    audience: `${AUTH0_DOMAIN}/api/v2/`,
    grant_type: "client_credentials",
  });

  const config = {
    method: "post",
    url: `${AUTH0_DOMAIN}/oauth/token`,
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip,deflate,compress", // salta error "br" brotli compression encoding
      Cookie:
        "did=s%3Av0%3A2a775050-8d3c-11ed-9382-a7c40677030b.VFIngoOjJ%2FypzytA%2B6JXzPKT5pWLzDg7NuGb4LiG9wE; did_compat=s%3Av0%3A2a775050-8d3c-11ed-9382-a7c40677030b.VFIngoOjJ%2FypzytA%2B6JXzPKT5pWLzDg7NuGb4LiG9wE",
    },
    data: data,
  };

  let response = await axios(config);
  response = await response.data;
  res.locals.managementToken = await response.access_token;
  next();
};

module.exports = {
  fetchManagementToken,
};
