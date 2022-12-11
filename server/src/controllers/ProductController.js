const {
  Producto,
  Categoria,
  Image,
  Color,
  Size,
  Producto_Color,
  Producto_Size,
} = require("../db");

const getProducts = async (req, res) => {
  try {
    // const queries = {};
    const { size, color, categoria } = req.query;

    if (size || color || categoria) {
      // if (size) queries.size = size;
      // if (color) queries.color = color;
      // if (categoria) queries.categoria = categoria;

      let categoryArray;
      let colorArray = [];
      let sizeArray = [];

      let idArray = [];
      let amountOfFilters = 0;

      if (categoria) {
        amountOfFilters++;
        categoryArray = await Categoria.findOne({
          where: { nombre: categoria },
          include: [{ model: Producto, through: { attributes: [] } }],
        });
        categoryArray.Productos.forEach((producto) =>
          idArray.push(producto.id)
        );
      }

      if (color) {
        amountOfFilters++;
        colorArray = await Color.findOne({
          where: { nombre: color },
          include: [{ model: Producto, through: { attributes: [] } }],
        });

        colorArray.Productos.forEach((producto) => idArray.push(producto.id));
      }

      if (size) {
        amountOfFilters++;
        sizeArray = await Size.findOne({
          where: { nombre: size },
          include: [{ model: Producto, through: { attributes: [] } }],
        });

        sizeArray.Productos.forEach((producto) => idArray.push(producto.id));
      }
      console.log("filters applied: " + amountOfFilters);

      const count = {};

      for (const element of idArray) {
        if (count[element]) {
          count[element] += 1;
        } else {
          count[element] = 1;
        }
      }

      let matchingIdsArr = []; // id para productos que hacen match con todos los filtros

      for (const [id, matches] of Object.entries(count)) {
        if (parseInt(matches) === amountOfFilters) matchingIdsArr.push(id);
      }

      matchingIdsArr = matchingIdsArr.map((id) => parseInt(id));

      // console.log(matchingIdsArr); // ids de productos que cumplen todos los filtros

      // MANEJANDO PRODUCTOS EN BASE A IDS OBTENIDOS

      const allProducts = await Producto.findAll({
        include: [
          { model: Categoria, through: { attributes: [] } },
          { model: Image },
          { model: Color, through: { attributes: [] } },
          { model: Size, through: { attributes: [] } },
        ],
        order: [["id", "ASC"]],
      });

      // if (!allProducts.length) {
      //   return res
      //     .status(200)
      //     .json("Actualmente no hay productos en la base de datos");
      // }

      let formattedProducts = [];

      for (let product of allProducts) {
        let imagesArr = [];

        product.Images.forEach((img) =>
          imagesArr.push({ id: img.id, nombre: img.nombre })
        );

        let colorsArr = [];

        product.Colors.forEach((color) => {
          colorsArr.push({ id: color.id, nombre: color.nombre });
        });

        let sizesArr = [];

        product.Sizes.forEach((size) => {
          sizesArr.push({ id: size.id, nombre: size.nombre });
        });

        formattedProducts.push({
          id: product.id,
          nombre: product.nombre,
          URL: imagesArr,
          precio: product.precio,
          color: colorsArr,
          talla: sizesArr,
          marca: product.marca,
          categoria: product.Categoria[0].nombre,
        });
      }

      // const testarrob = [{ id: 1 }, { id: 3 }, { id: 5 }];

      const filteredProducts = [];

      for (let i in formattedProducts) {
        for (let j in matchingIdsArr) {
          if (formattedProducts[i].id === matchingIdsArr[j]) {
            filteredProducts.push(formattedProducts[i]);
          }
        }
      }

      res.status(200).json(filteredProducts);
      return;
    }

    /*-------------------------------- DE NO HABER QUERIES SE EJECUTA EL CODIGO DE ABAJO--------------------------------*/

    const categories = await Categoria.findAll();

    if (!categories.length) {
      throw new Error("Debe añadirse valores a la tabla de categorias");
    }

    const allProducts = await Producto.findAll({
      include: [
        { model: Categoria, through: { attributes: [] } },
        { model: Image },
        { model: Color, through: { attributes: [] } },
        { model: Size, through: { attributes: [] } },
      ],
      order: [["id", "ASC"]],
    });

    if (!allProducts.length) {
      return res
        .status(200)
        .json("Actualmente no hay productos en la base de datos");
    }

    let formattedProducts = [];

    for (let product of allProducts) {
      let imagesArr = [];

      product.Images.forEach((img) =>
        imagesArr.push({ id: img.id, nombre: img.nombre })
      );

      let colorsArr = [];

      product.Colors.forEach((color) => {
        colorsArr.push({ id: color.id, nombre: color.nombre });
      });

      let sizesArr = [];

      product.Sizes.forEach((size) => {
        sizesArr.push({ id: size.id, nombre: size.nombre });
      });

      formattedProducts.push({
        id: product.id,
        nombre: product.nombre,
        URL: imagesArr,
        precio: product.precio,
        color: colorsArr,
        talla: sizesArr,
        marca: product.marca,
        categoria: product.Categoria[0].nombre,
      });
    }

    res.status(200).json(formattedProducts);
    return;
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  // el formulario debe enviar un objeto como este:

  // {
  //   id: 1,
  //   nombre: "Campera Deportiva NOTAdidas",
  //   deletedImages: [1, 2],
  //   addedImages: [
  //     "https://m.media-amazon.com/images/I/71czpl8TjzL._AC_UY1000_.jpg",
  //     "https://www.tradeinn.com/f/13822/138225338/le-coq-sportif-sudadera-con-capucha-as-saint-etienne-presentacion.jpg",
  //   ],
  //   precio: "40",
  //   color: ["Amarillo", "Azul", "Rojo"],
  //   talla: ["M", "XXL"],
  //   marca: "NOTAdidas",
  //   categoria: "Pantalones",
  // };

  try {
    const { id } = req.params;
    const {
      nombre,
      deletedImages,
      addedImages,
      precio,
      color,
      talla,
      marca,
      categoria,
    } = req.body;

    Producto.findByPk(parseInt(id), {
      include: [{ model: Categoria, attributes: ["nombre"] }],
    })
      .then((product) => {
        product.nombre = nombre ? nombre : product.nombre;
        product.precio = precio ? precio : product.precio;
        product.marca = marca ? marca : product.marca;

        product.save();
      })
      .catch((error) => error);

    const category = await Categoria.findOne({ where: { nombre: categoria } });

    const product = await Producto.findByPk(parseInt(id));

    await product.setCategoria(category.id);

    //elimina colores preexistentes

    let productoColors = await Producto_Color.findAll({
      where: { ProductoId: parseInt(id) },
    });
    productoColors.forEach((entry) => entry.destroy());

    //agrega colores recibidos

    color.forEach(async (color) => {
      const matchingColor = await Color.findOne({
        where: { nombre: color },
      });
      product.addColor(matchingColor);
    });

    //elimina tallas preexistentes

    let productSizes = await Producto_Size.findAll({
      where: { ProductoId: parseInt(id) },
    });
    productSizes.forEach((entry) => entry.destroy());

    //agrega tallas recibidas

    talla.forEach(async (talla) => {
      const matchingSize = await Size.findOne({
        where: { nombre: talla },
      });
      product.addSize(matchingSize);
    });

    // elimina imagenes seleccionadas

    deletedImages.forEach((imgId) =>
      Image.findByPk(parseInt(imgId)).then((img) => img.destroy())
    );

    //agrega imagenes seleccionadas

    addedImages.forEach((img) => product.createImage({ nombre: img }));

    res.status(200).json("Product updated successfully");
    return;
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const postProduct = async (req, res) => {
  //Espera recibir un objeto como este:

  // const postObj= {
  //   nombre: "Chaqueta invierno",
  //   precio: 34,
  //   marca: "Avellaneda",
  //   imagenes: [
  //     "https://cdn.shopify.com/s/files/1/0034/5459/9217/products/product-image-554242470_1024x1024@2x.jpg?v=1571720317",
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTown4u2TWUQTvbw6QnvvB5wbSFmM3CHyTV7w&usqp=CAU",
  //   ],
  //   tallas: [XL, M],
  //   colores: ["Amarillo", "Azul", "Rojo"],
  //   categoria: "Pantalones",
  // };
  try {
    const { nombre, precio, marca, imagenes, tallas, colores, categoria } =
      req.body;

    const product = await Producto.create({
      nombre,
      marca,
      precio,
    });

    // relaciona categoria

    const matchingCategory = await Categoria.findOne({
      where: { nombre: categoria },
    });

    product.addCategoria(matchingCategory);

    //relaciona tallas

    tallas.forEach(async (size) => {
      let matchingSize = await Size.findOne({
        where: {
          nombre: size.toString(),
        },
      });

      product.addSize(matchingSize);
    });

    // relaciona colores

    colores.forEach(async (color) => {
      let matchingColor = await Color.findOne({
        where: {
          nombre: color,
        },
      });

      product.addColor(matchingColor);
    });

    // agrega imagenes

    imagenes.forEach((img) => product.createImage({ nombre: img }));

    return res.status(200).json("El producto se agregó correctamente");
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Producto.findByPk(parseInt(id));
    await product.destroy();
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getProducts,
  updateProduct,
  deleteProduct,
  postProduct,
};
