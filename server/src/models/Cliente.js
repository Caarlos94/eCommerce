const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cliente",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        alowNull: false,
      },
      nickname: {
        // 🎇
        type: DataTypes.STRING,
      },
      email: {
        // 🎇
        type: DataTypes.STRING,
      },
      email_Verified: {
        // 🎇
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      picture: {
        // 🎇
        type: DataTypes.STRING,
      },
      googleId: {
        type: DataTypes.STRING,
      },
      auth0Id: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
