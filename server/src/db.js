require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

console.log(DB_HOST);

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
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

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Producto, Categoria, Image, Size, Color } = sequelize.models;

const Producto_Categoria = sequelize.define(
  "Producto_Categoria",
  {},
  { timestamps: false }
);

const Producto_Size = sequelize.define(
  "Producto_Size",
  {},
  { timestamps: false }
);

const Producto_Color = sequelize.define(
  "Producto_Color",
  {},
  { timestamps: false }
);

Producto.belongsToMany(Categoria, { through: Producto_Categoria });
Categoria.belongsToMany(Producto, { through: Producto_Categoria });

Producto.hasMany(Image);
Image.belongsTo(Producto);

Producto.belongsToMany(Size, { through: Producto_Size });
Size.belongsToMany(Producto, { through: Producto_Size });

Producto.belongsToMany(Color, { through: Producto_Color });
Color.belongsToMany(Producto, { through: Producto_Color });

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
