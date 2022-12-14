const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Pregunta",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        alowNull: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
      },
      wasAnswered: {
        type: DataTypes.BOOLEAN,
        alowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
