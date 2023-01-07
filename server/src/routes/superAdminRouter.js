const { Router } = require("express");
const superAdminRouter = Router();
const { fetchManagementToken } = require("./middleware/fetchManagementToken");
var axios = require("axios").default;

superAdminRouter.post("/removeAdmin", fetchManagementToken, async (req, res) => {
  try {
   let { managementToken } = res.locals;
   let  idUsers  = req.body
 
  //  console.log(idUsers);
   for(let index in idUsers){
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
      throw new Error(error)
    });

   }
   
    res.status(200).json({msg:'usuarios eliminados de rol admin'})
  } catch (error) {
    res.status(400).json({err:error.message})
  }


});

superAdminRouter.get(
  "/fetchRoles",
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
    } catch (error) {
      res.send(error.message)
    }
  }
);

module.exports = superAdminRouter;
