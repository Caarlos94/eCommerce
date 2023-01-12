import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORYS = "GET_CATEGORYS";
export const SEARCHxMARCA = "SEARCHxMARCA";
export const SEARCHxPRECIO = "SEARCHxPRECIO";
export const SEARCHxTALLA = "SEARCHxTALLA";
export const SEARCHxNAME = "SEARCHxNAME";
export const GET_DETAILS = "GET_DETAILS";
export const LIMPIAR_SATE = "LIMPIAR_SATE";
export const SEARCHxCATEGORIA = "SEARCHxCATEGORIA";
export const EMPTY_ERROR = "EMPTY_ERROR";
export const ORDER_PRECIO = "ORDER_PRECIO";
export const GET_USER = "GET_USER";
export const POST_PROD = "POST_PROD";
export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_ONE_TO_CART = "ADD_ONE_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const REMOVE_FROM_FAVORITE = "REMOVE_FROM_FAVORITE";
export const GET_REVIEWS = "GET_REVIEWS";
export const GET_FAVORITES = "GET_FAVORITES";
export const EMAIL = "EMAIL";
export const GET_CARRITO = "GET_CARRITO";
export const GET_TOKEN = "GET_TOKEN";
export const ADD_PAGINATE = "ADD_PAGINATE";

export const getProducts = () => {
  return async function (dispatch) {
    const response = await fetch("https://suprasports.up.railway.app/products");
    // console.log(response);
    const data = await response.json();
    return dispatch({
      type: GET_PRODUCTS,
      payload: [data, "dejar todo como esta"],
    });
  };
};

export const getProducts2 = () => {
  return async function (dispatch) {
    const response = await fetch("https://suprasports.up.railway.app/products");
    const data = await response.json();
    return dispatch({
      type: GET_PRODUCTS,
      payload: [data, "volver a cargar los productos"],
    });
  };
};

export function updateProduct(data, id, accessToken) {
  // necesita token
  return function () {
    fetch(`https://suprasports.up.railway.app/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  };
}

export function postProd(payload, accessToken) {
  // necesita token

  return async function () {
    const response = await axios.post(
      "https://suprasports.up.railway.app/products",
      payload,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  };
}

export function getCategorys() {
  return async function (dispatch) {
    await fetch("https://suprasports.up.railway.app/category")
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_CATEGORYS, payload: data }));
  };
}

export function getUserInfo() {
  return function (dispatch) {
    const response = axios.get(`https://suprasports.up.railway.app/users`);
    return dispatch({
      type: GET_USER,
      payload: response.data,
    });
  };
}

export function getReviews(id) {
  return async function (dispatch) {
    const response = await axios.get(
      `https://suprasports.up.railway.app/compras/reviews/${id}`
    );
    return dispatch({
      type: GET_REVIEWS,
      payload: response.data,
    });
  };
}

export function importUser(user) {
  // necesita token

  return function () {
    fetch("https://suprasports.up.railway.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };
}

export function postCategory(payload, token) {
  // necesita token

  return async function () {
    const response = await axios.post(
      "https://suprasports.up.railway.app/category",
      payload,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
}

export function deleteCategory(nombre, accessToken) {
  // necesita token

  return async function () {
    await axios.delete(`https://suprasports.up.railway.app/category/${nombre}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
}

export function deleteProd(id, accessToken) {
  // necesita token

  return async function (dispatch) {
    await axios.delete(`https://suprasports.up.railway.app/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return dispatch({
      type: "DELETE_PROD",
      payload: id,
    });
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    const response = await axios.get(`https://suprasports.up.railway.app/products/${id}`);
    return dispatch({
      type: GET_DETAILS,
      payload: response.data,
    });
  };
}

export function limpiarState(id) {
  return {
    type: LIMPIAR_SATE,
  };
}

export function orderPrecio(payload) {
  return {
    type: ORDER_PRECIO,
    payload: payload,
  };
}

export const searchXname = (name) => {
  return {
    type: SEARCHxNAME,
    payload: name,
  };
};

export const searchXmarca = (marca) => {
  return {
    type: SEARCHxMARCA,
    payload: marca,
  };
};

export const searchXprecio = (precio) => {
  //precio llega como un string
  //lo convierto en un arreglo con el metodo split
  const arr = precio.split(",");
  //los valores del arreglo anterior siguen siendo string
  //mapeo el arreglo anterior y cada indice se convierte en number
  const arr2 = arr.map((element) => parseInt(element));
  return {
    type: SEARCHxPRECIO,
    payload: arr2,
  };
};

export const searchXtalla = (talla) => {
  return {
    type: SEARCHxTALLA,
    payload: talla,
  };
};

export const searchXcategoria = (categoria) => {
  return {
    type: SEARCHxCATEGORIA,
    payload: categoria,
  };
};

export function addToCart(id) {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
}
export function addOneToCart(id) {
  return {
    type: ADD_ONE_TO_CART,
    payload: id,
  };
}
export function removeOneFromCart(id) {
  return {
    type: REMOVE_ONE_FROM_CART,
    payload: id,
  };
}
export function removeAllFromCart(id) {
  return {
    type: REMOVE_ALL_FROM_CART,
    payload: id,
  };
}
export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}
export function getFavorites(email) {
  return async function (dispatch) {
    const response = await axios.get(
      `https://suprasports.up.railway.app/favoritos/${email}`
    );
    return dispatch({
      type: GET_FAVORITES,
      payload: response.data,
    });
  };
}

export function addToFavorite(payload) {
  // necesita token

  return async function () {
    const response = await axios.post(
      'https://suprasports.up.railway.app/favoritos',
      payload
    );
    return response;
  };
}

export function removeFromFavorite(id) {
  // necesita token

  return {
    type: REMOVE_FROM_FAVORITE,
    payload: id,
  };
}

// export function getCarrito(email) {
//   return async function (dispatch) {
//     const response = await axios.get(`https://suprasports.up.railway.app/carrito/${email}`);
//     return dispatch({
//       type: GET_CARRITO,
//       payload: response.data,
//     });
//   };
// }
/* 
export function addToCarrito(payload) {
  return async function () {
    const response = await axios.post('https://suprasports.up.railway.app/carrito', payload);
    return response;
  };
} */

export function removeFromCarrito(id) {
  return {
    type: REMOVE_FROM_FAVORITE,
    payload: id,
  };
}

export function AddPaginate(num) {
  return {
    type: ADD_PAGINATE,
    payload: num,
  };
}
