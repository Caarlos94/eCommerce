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



export const getProducts = () => {
  return function (dispatch) {
    return fetch("http://localhost:3001/products")
      .then(response => response.json())
      .then(data => dispatch({ type: GET_PRODUCTS, payload: [data,'dejar todo como esta']}))
  };
};

export const getProducts2 = () => {
  return function (dispatch) {
    return fetch("http://localhost:3001/products")
      .then(response => response.json())
      .then(data => dispatch({ type: GET_PRODUCTS, payload: [data,'volver a cargar los productos'] }))
  };
};

export function getCategorys() {
  return function (dispatch) {
    fetch('http://localhost:3001/category')
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_CATEGORYS, payload: data }));
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

export const emptyError = () => {
  return { type: EMPTY_ERROR }
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

