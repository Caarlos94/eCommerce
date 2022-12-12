const { Color } = require("../db");

const getColors = async (req, res) => {
  try {
    const colors = await Color.findAll();

    res.status(200).json(colors);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const postColor = async (req, res) => {
  try {
    let { color } = req.body;

    if (typeof color !== "string" || !color) {
      throw new Error("Valor inválido");
    }
    color = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();

    await Color.create({ nombre: color });

    res.status(200).json(`El color ${color} se creó exitosamente`);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const updateColor = async (req, res) => {
  try {
    let { nombreActual, nombreNuevo } = req.body;

    if (
      Object.keys(req.body).length !== 2 ||
      typeof nombreActual !== "string" ||
      typeof nombreNuevo != "string"
    ) {
      throw new Error(
        `Valor inválido. Enviar como {"nombreActual":"azul","nombreNuevo":"gris" }`
      );
    }
    nombreActual =
      nombreActual.charAt(0).toUpperCase() +
      nombreActual.slice(1).toLowerCase();

    nombreNuevo =
      nombreNuevo.charAt(0).toUpperCase() + nombreNuevo.slice(1).toLowerCase();

    const allColors = await Color.findAll();
    let hasNewName = false;
    let hasCurrentName = false;

    allColors.forEach((c) => {
      if (c.nombre === nombreNuevo) {
        hasNewName = true;
      }
      if (c.nombre === nombreActual) {
        hasCurrentName = true;
      }
    });

    if (!hasCurrentName) {
      throw new Error(`El color ${nombreActual} no existe`);
    }

    if (hasNewName) throw new Error(`El color ${nombreNuevo} ya existe`);

    const matchingColor = await Color.findOne({
      where: { nombre: nombreActual },
    });

    matchingColor.nombre = nombreNuevo;
    matchingColor.save();

    res.status(200).json("El color fue actualizado");
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deleteColor = async (req, res) => {
  try {
    let { color } = req.body;

    if (typeof color !== "string" || !color) {
      throw new Error(
        `Valor inválido. Insertar nombre de la color como {color:"nombre del color"}`
      );
    }
    color = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();

    const matchingColor = await Color.findOne({
      where: { nombre: color },
    });

    if (!matchingColor) {
      throw new Error("No existe tal categoría");
    }

    matchingColor.destroy();

    res.status(200).json(`El color ${color} fue eliminado`);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  getColors,
  postColor,
  deleteColor,
  updateColor,
};
