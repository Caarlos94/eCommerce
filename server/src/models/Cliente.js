const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    picture: {
        type: DataTypes.STRING,
    },
    direction: {
        type: DataTypes.STRING
    },
    purchase_history: {  //PENDIENTE
        type: DataTypes.STRING
    }
  }, { timestamps: false } );
};