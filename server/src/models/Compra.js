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
      },
      ciudad: {
        type: DataTypes.STRING,
        alowNull: true,
      },
      cp: {
        type: DataTypes.INTEGER,
        alowNull: true,
      },
      direccion: {
        type: DataTypes.STRING,
        alowNull: true,
      },
      cel: {
        type: DataTypes.INTEGER,
        alowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: "fecha",
      updatedAt: false,
    }
  );
};
