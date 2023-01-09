const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('cliente', { 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      alowNull: false,
    },
    nickname: { // 🎇
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {  // 🎇
      type: DataTypes.STRING,
      // allowNull: false,
      // unique: true,
    },
    email_Verified: {  // 🎇
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    // picture: {  // 🎇
    //   type: DataTypes.STRING,
    // },
    // direccion: {  // POST
    //   type: DataTypes.STRING,
    //   // allowNull: false,
    // },
    // celular: {  // POST
    //   type: DataTypes.STRING,
    //   // allowNull: false,
    // },
    // cp: {  // POST
    //   type: DataTypes.STRING,
    //   // allowNull: false,
    // },
    // ciudad: {  //PENDIENTE
    //   type: DataTypes.STRING
    // },
    // admin: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  }, { timestamps: false });
}; 
