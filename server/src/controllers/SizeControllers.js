const { Size } = require("../db");

const getSizes = async (req, res) => {
  try {
    const sizes = await Size.findAll();

    res.status(200).json(sizes);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const postSize = async (req, res) => {
  try {
    let { size } = req.body;

    if (typeof size !== "string" || !size) {
      throw new Error("Valor inválido");
    }
    size = size.charAt(0).toUpperCase() + size.slice(1).toLowerCase();

    await Size.create({ nombre: size });

    res.status(200).json(`El size ${size} se creó exitosamente`);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const updateSize = async (req, res) => {
  try {
    let { nombreActual, nombreNuevo } = req.body;

    if (
      Object.keys(req.body).length !== 2 ||
      typeof nombreActual !== "string" ||
      typeof nombreNuevo != "string"
    ) {
      throw new Error(
        `Valor inválido. Enviar como {"nombreActual":"L","nombreNuevo":"Large" }`
      );
    }
    nombreActual =
      nombreActual.charAt(0).toUpperCase() +
      nombreActual.slice(1).toLowerCase();

    nombreNuevo =
      nombreNuevo.charAt(0).toUpperCase() + nombreNuevo.slice(1).toLowerCase();

    const allSizes = await Size.findAll();
    let hasNewName = false;
    let hasCurrentName = false;

    allSizes.forEach((c) => {
      if (c.nombre === nombreNuevo) {
        hasNewName = true;
      }
      if (c.nombre === nombreActual) {
        hasCurrentName = true;
      }
    });

    if (!hasCurrentName) {
      throw new Error(`La talla ${nombreActual} no existe`);
    }

    if (hasNewName) throw new Error(`La talla ${nombreNuevo} ya existe`);

    const matchingSize = await Size.findOne({
      where: { nombre: nombreActual },
    });

    matchingSize.nombre = nombreNuevo;
    matchingSize.save();

    res.status(200).json("La talla fue actualizado");
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
  getSizes,
  postSize,
  // deleteColor,
  updateSize,
};
