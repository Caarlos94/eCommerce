require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

/* const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
); */

const sequelize = new Sequelize(DB_DEPLOY, { logging: false, native: false });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Producto, Categoria, Cliente, Pregunta, Compra, Review } = sequelize.models;

Producto.belongsToMany(Categoria, { through: 'producto_categoria' });
Categoria.belongsToMany(Producto, { through: 'producto_categoria' });

Producto.hasMany(Pregunta);
Pregunta.belongsTo(Producto);

Compra.belongsTo(Cliente);
Cliente.hasMany(Compra);

const Compra_Producto = sequelize.define(
  'Compra_Producto',
  {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

const Favorito = sequelize.define('Favorito', {}, { timestamps: false });
Cliente.belongsToMany(Producto, { through: Favorito });
Producto.belongsToMany(Cliente, { through: Favorito });

Compra.belongsToMany(Producto, { through: Compra_Producto });
Producto.belongsToMany(Compra, { through: Compra_Producto });

Cliente.hasMany(Review);
Review.belongsTo(Cliente);

Producto.hasMany(Review);
Review.belongsTo(Producto);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
