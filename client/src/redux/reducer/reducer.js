// // Importa las action types acá
// <<<<<<< HEAD
// import { GET_PRODUCTS } from '../actions/actions.js';

// const initialState = {
//   products: [],
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_PRODUCTS: {
//       console.log(action.payload);
//       return {
//         ...state,
//         products: [...action.payload.Productos],
//       };
//     }
//   }
//   return { ...state };
// =======
import { GET_PRODUCTS, SEARCHxNAME } from '../actions/actions.js';

const initialState = {
  products: [],
  productsXname: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      console.log(action.payload);
      return {
        ...state,
        products: [...action.payload.Productos],
      };
    }

    case SEARCHxNAME: {
      const productsFilter = state.products.filter((Element) =>
        Element.categoria.includes(action.payload)
      );

      return {
        ...state,
        productsXname: [...productsFilter],
      };
    }
  }
  return { ...state };
  // >>>>>>> development
};

export default rootReducer;
