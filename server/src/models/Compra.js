const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Compra",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        alowNull: false,
      },

      enviado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      fecha: {
        type: DataTypes.DATE,
      },

      localizador: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
