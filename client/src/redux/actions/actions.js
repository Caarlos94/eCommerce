import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORYS = 'GET_CATEGORYS';
export const SEARCHxMARCA = 'SEARCHxMARCA';
export const SEARCHxPRECIO = 'SEARCHxPRECIO';
export const SEARCHxTALLA = 'SEARCHxTALLA';
export const SEARCHxNAME = 'SEARCHxNAME';
export const GET_DETAILS = 'GET_DETAILS';
export const LIMPIAR_SATE = 'LIMPIAR_SATE';
export const SEARCHxCATEGORIA = 'SEARCHxCATEGORIA';
export const EMPTY_ERROR = 'EMPTY_ERROR';
export const ORDER_PRECIO = 'ORDER_PRECIO';
export const GET_USER = 'GET_USER';
export const POST_PROD = 'POST_PROD';
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_ONE_TO_CART = 'ADD_ONE_TO_CART';
export const REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CART';
export const REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const IMPORT_USER = 'IMPORT_USER';
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE';

export const getProducts = () => {
  return async function (dispatch) {
    const response = await fetch('http://localhost:3001/products');
    console.log(response);
    const data = await response.json();
    return dispatch({
      type: GET_PRODUCTS,
      payload: [data, 'dejar todo como esta'],
    });
  };
};

export const getProducts2 = () => {
  return async function (dispatch) {
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();
    return dispatch({
      type: GET_PRODUCTS,
      payload: [data, 'volver a cargar los productos'],
    });
  };
};

export function updateProduct(data) {
  return function () {
    fetch('http://localhost:3001/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };
}

export function postProd(payload) {
  return async function () {
    const response = await axios.post(
      'http://localhost:3001/products',
      payload
    );
    return response;
  };
}

export function getCategorys() {
  return async function (dispatch) {
    await fetch('http://localhost:3001/category')
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_CATEGORYS, payload: data }));
  };
}

export function getUserInfo() {
  return function (dispatch) {
    const response = axios.get(`http://localhost:3001/users`);
    return dispatch({
      type: GET_USER,
      payload: response.data,
    });
  };
}

export function importUser(user) {
  return function () {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };
}


export function postCategory(payload) {
  return async function () {
    const response = await axios.post(
      'http://localhost:3001/category',
      payload
    );
    return response;
  };
}

export function deleteCategory(nombre) {
  return async function () {
    await axios.delete(`http://localhost:3001/category/${nombre}`);
  }
}

export function deleteProd(id) {
  return async function (dispatch) {
    await axios.delete(`http://localhost:3001/products/${id}`);
    return dispatch({
      type: 'DELETE_PROD',
      payload: id,
    })
  }
}

export function getDetails(id) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/products/${id}`);
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
  const arr = precio.split(',');
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
export function addToFavorite(id) {
  return {
    type: ADD_TO_FAVORITE,
    payload: id,
  };
}
export function removeFromFavorite(id) {
  return {
    type: REMOVE_FROM_FAVORITE,
    payload: id,
  };
}
