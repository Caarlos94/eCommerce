const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('producto', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      alowNull: false,
      // type: DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    URL: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    talla: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      // validate: { min: 0, max: 100 }
    }
  }, { timestamps: false });
};