const { Categoria } = require("../db");

const getCategories = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();

    res.status(200).json(categorias);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const postCategory = async (req, res) => {
  try {
    let { categoria } = req.body;

    if (typeof categoria !== "string" || !categoria) {
      throw new Error("Valor inválido");
    }
    categoria =
      categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();

    // const matchingCategories = await Categoria.findAll({
    //   where: { nombre: categoria },
    // });

    // if (matchingCategories.length) {
    //   throw new Error("La categoría ya existe");
    // }

    // verificar que no exista ya

    Categoria.create({ nombre: categoria });

    res.status(200).json(`La categoría ${categoria} se creó exitosamente`);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    let { nombreActual, nombreNuevo } = req.body;

    if (
      Object.keys(req.body).length !== 2 ||
      typeof nombreActual !== "string" ||
      typeof nombreNuevo != "string"
    ) {
      throw new Error(
        `Valor inválido. Insertar nombre de la categoria como {"nombreActual":"abrigos","nombreNuevo":"pulseras" }`
      );
    }
    nombreActual =
      nombreActual.charAt(0).toUpperCase() +
      nombreActual.slice(1).toLowerCase();

    nombreNuevo =
      nombreNuevo.charAt(0).toUpperCase() + nombreNuevo.slice(1).toLowerCase();

    const allCategories = await Categoria.findAll();
    let hasNewName = false;
    let hasCurrentName = false;

    allCategories.forEach((c) => {
      if (c.nombre === nombreNuevo) {
        hasNewName = true;
      }
      if (c.nombre === nombreActual) {
        hasCurrentName = true;
      }
    });

    if (!hasCurrentName) {
      throw new Error(`La categoría ${nombreActual} no existe`);
    }

    if (hasNewName) throw new Error(`La categoría ${nombreNuevo} ya existe`);

    const matchingCategory = await Categoria.findOne({
      where: { nombre: nombreActual },
    });

    matchingCategory.nombre = nombreNuevo;
    matchingCategory.save();

    res.status(200).json("La categoría fue actualizada");
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    let { categoria } = req.body;

    if (typeof categoria !== "string" || !categoria) {
      throw new Error(
        `Valor inválido. Insertar nombre de la categoria como {categoria:"nombre de la categoria"}`
      );
    }
    categoria =
      categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();

    const matchingCategory = await Categoria.findOne({
      where: { nombre: categoria },
    });

    if (!matchingCategory) {
      throw new Error("No existe tal categoría");
    }

    matchingCategory.destroy();

    res.status(200).json("La categoría fue eliminada");
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  getCategories,
  postCategory,
  deleteCategory,
  updateCategory,
};
