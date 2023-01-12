const { Router } = require("express");
const { Categoria } = require("../db.js");
const { getCategories } = require("./functions");
const categoryRouter = Router();
const { validateAdmin } = require("./middleware/validateAdmin");
const { validateAccessToken } = require("./middleware/validateAccessToken");
const { errorHandler } = require("./middleware/error.middleware");

categoryRouter.get("/", async (req, res) => {
  try {
    res.status(200).json(await getCategories());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

categoryRouter.post(
  "/",
  validateAccessToken,
  validateAdmin,
  async (req, res) => {
    try {
      let nombre = req.body;
      let newCategory = await Categoria.create(nombre);
      res.status(200).json(newCategory);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

categoryRouter.delete(
  "/:nombre",
  validateAccessToken,
  validateAdmin,
  async (req, res) => {
    try {
      let { nombre } = req.params;
      const category = await Categoria.findOne({
        where: { nombre },
      });
      console.log(category);
      await category.destroy();
      res.status(200).json(category);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

categoryRouter.use(errorHandler);

module.exports = categoryRouter;
