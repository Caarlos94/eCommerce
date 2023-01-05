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

      localizador: {
        type: DataTypes.STRING,
      }

    },
    {
      timestamps: true,
      createdAt: "fecha",
      updatedAt: false,
    },
    
  );
};
