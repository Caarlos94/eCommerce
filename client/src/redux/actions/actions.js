import axios from axios;

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SEARCHxNAME = 'SEARCHxNAME';


// export const getProducts = () => { 

//     return{ type: GET_PRODUCTS ,
//             payload:  Productos
//         }
// };

export const getProducts = () => {
  return function (dispatch) {
    return fetch("https://supra-sports-default-rtdb.firebaseio.com/.json")
      .then(response => response.json())
      .then(data => dispatch({ type: GET_PRODUCTS, payload: data }))
  };
};

export function postProd(payload) {
  return async function () {
    const response = await axios.post('/products/', payload)
    return response
  }
}


export const searchXname = (name) => {
  return {
    type: SEARCHxNAME,
    payload: name
  }
}