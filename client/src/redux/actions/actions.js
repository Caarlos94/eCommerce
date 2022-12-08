export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SEARCHxNAME = 'SEARCHxNAME';
export const GET_CATEGORYS = 'GET_CATEGORYS';

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


export function getCategorys() {
  return function (dispatch) {
    fetch('http://localhost:3001/category')
      .then(response => response.json())
      .then((data) => dispatch({ type: GET_CATEGORYS, payload: data }))
  }
}

export function postProd(dataForm) {
  return function () {
    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm)
    })
  }
}

export const searchXname = (name) => {
  return {
    type: SEARCHxNAME,
    payload: name
  }
}