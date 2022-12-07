// Importa las action types acá
import { GET_PRODUCTS } from '../actions/actions.js';

const initialState = {
  products: [],
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
  }
  return { ...state };
};

export default rootReducer;
