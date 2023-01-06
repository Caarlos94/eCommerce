const { Router } = require("express");
const superAdminRouter = Router();
const { fetchManagementToken } = require("./middleware/fetchManagementToken");

superAdminRouter.get("/removeAdmin", fetchManagementToken, async (req, res) => {
  try {
    var axios = require("axios").default;

    var options = {
      method: "DELETE",
      url: "https://dev-62en868tsb2ut7tq.us.auth0.com/api/v2/users/USER_ID/roles",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer MGMT_API_ACCESS_TOKEN",
        "cache-control": "no-cache",
      },
      data: { roles: ["ROLE_ID"] },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log(res.locals.managementToken);
  } catch (error) {}
});

superAdminRouter.get(
  "/fetchRolesTEST",
  fetchManagementToken,
  async (req, res) => {
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
    } catch (error) {}
  }
);

module.exports = superAdminRouter;
