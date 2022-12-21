const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: { // 🎇
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mail: {  // 🎇
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { // ?????
      type: DataTypes.STRING,
      allowNull: false,
      /* unique: true, */
    },
    picture: {  // 🎇
      type: DataTypes.STRING,
    },
    direction: {  // POST
      type: DataTypes.STRING,
      allowNull: false,
    },
    cel: {  // POST
      type: DataTypes.STRING,
      allowNull: false,
    },
    cp: {  // POST
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchase_history: {  //PENDIENTE
      type: DataTypes.STRING
    }
    // admin: {
    //   type: DataTypes.BOOLEAN,
    //   default: false
    // }
  }, { timestamps: false });
}; 
