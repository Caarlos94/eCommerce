// ESTA FUNCION DEBE EJECUTARSE EN EL CARRITO PARA REDIRECCIONAR A PAGO EN MERCADOPAGO

// testItemsData debe ser el array de items a pagar
// Hay un ejemplo del array en en la carpeta "Ejemplos de items a pagar"

// const handleBuy = () => {
//   fetch("http://localhost:3001/payment", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(testItemsData),
//   })
//     .then((data) => data.json())
//     .then((data) => {
//       if (data.error) console.log(data); // manejar caso de error
//       window.open(data["init_point"], "_self");
//     });
// };

const testItemsData = [
  {
    id: "item-ID-1234",
    title: "Mi producto",
    currency_id: "ARS",
    picture_url:
      "https://static.wikia.nocookie.net/ultimatepopculture/images/2/24/Blue_Tshirt.jpg/revision/latest?cb=20191022124938",
    description: "Descripción del Item", // Opcional
    category_id: "Ropa y Accesorios", // Igual para todos
    quantity: 1,
    unit_price: 75.76,
  },
  {
    id: "item-ID-1235",
    title: "Mi otro producto",
    currency_id: "ARS",
    picture_url:
      "https://static.wikia.nocookie.net/ultimatepopculture/images/2/24/Blue_Tshirt.jpg/revision/latest?cb=20191022124938",
    description: "Descripción del Item",
    category_id: "Ropa y Accesorios",
    quantity: 1,
    unit_price: 50.5,
  },
];
