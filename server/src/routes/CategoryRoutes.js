const { Router } = require("express");
const router = Router();

const { getCategories } = require("../controllers/CategoryControllers");

router.get("/", getCategories);

module.exports = router;
