// Importa las action types acá
import { GET_PRODUCTS, SEARCHxNAME, GET_CATEGORYS } from '../actions/actions.js'


const initialState = {
  products: [],
  productsXname: [],
  categorys: []
};


const rootReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_PRODUCTS: {
      console.log(action.payload);
      return {
        ...state,
        products: [...action.payload.Productos]
      }
    };

    case GET_CATEGORYS:
      return {
        ...state,
        categorys: action.payload,
      }

    case 'POST_PROD':
      return {
        ...state,
        products: action.payload
      };


    case SEARCHxNAME: {
      const productsFilter = state.products.filter(Element => Element.categoria.includes(action.payload))

      return {
        ...state,
        productsXname: [...productsFilter]
      }
    }
    default:
      return { ...state };

  }
};

export default rootReducer;
