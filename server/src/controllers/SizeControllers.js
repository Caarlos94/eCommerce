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
    if (!!isNaN(size)) {
      size = size.toUpperCase();
    } // no sería necesario si lo posteamos por id

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
        `Valor inválido. Enviar como {"nombreActual":"L","nombreNuevo":"LARGE" }`
      );
    }

    if (!!isNaN(nombreActual)) {
      nombreActual = nombreActual.toUpperCase();
    }

    if (!!isNaN(nombreNuevo)) {
      nombreNuevo = nombreNuevo.toUpperCase();
    }

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

const deleteSize = async (req, res) => {
  try {
    let { size } = req.body;

    if (typeof size !== "string" || !size) {
      throw new Error(
        `Valor inválido. Insertar nombre de la color como {size:"nombre de la talla"}`
      );
    }

    if (!!isNaN(size)) {
      size = size.toUpperCase();
    } // no sería necesario si lo eliminamos por id

    const matchingSize = await Size.findOne({
      where: { nombre: size },
    });

    if (!matchingSize) {
      throw new Error("No existe tal talla");
    }

    matchingSize.destroy();

    res.status(200).json(`La talla ${size} fue eliminada`);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  getSizes,
  postSize,
  deleteSize,
  updateSize,
};
