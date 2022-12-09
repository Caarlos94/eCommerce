import {
  GET_PRODUCTS,
  GET_DETAILS,
  SEARCHxNAME,
  SEARCHxMARCA,
  SEARCHxPRECIO,
  SEARCHxTALLA,
  GET_CATEGORYS,
} from '../actions/actions.js';

const initialState = {
  products: [],
  productsHome: [],
  details: [],
  categorys: [],
  marca: 'todas',
  talla: 'todas',
  precio: [0, 0],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      //console.log(action.payload);
      return {
        ...state,
        products: [...action.payload],
        productsHome: [...action.payload],
      }
    };

    case GET_CATEGORYS:
      return {
        ...state,
        categorys: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case 'POST_PROD':
      return {
        ...state,
        products: action.payload,
      };

    case SEARCHxNAME: {
      const productsFilter = state.products.filter(Element => Element.nombre.toLowerCase().includes(action.payload.toLowerCase()))
      return {
        ...state,
        productsHome: [...productsFilter],
      };
    }

    case SEARCHxMARCA: {
      let productsFilter = [];
      if (action.payload === 'todas') {
        let arr = [...state.products];
        if (state.precio[1] !== 0)
          arr = arr.filter(
            (Element) =>
              state.precio[0] <= parseInt(Element.precio) &&
              state.precio[1] >= parseInt(Element.precio)
          );
        if (state.talla !== 'todas')
          arr = arr.filter((Element) => Element.talla.includes(state.talla));
        productsFilter = [...arr];
      } else {
        productsFilter = state.products.filter((Element) =>
          Element.marca.includes(action.payload)
        );
      }
      return {
        ...state,
        productsHome: [...productsFilter],
        marca: action.payload,
      };
    }

    case SEARCHxTALLA: {
      let productsFilter = [];
      if (action.payload === 'todas') {
        let arr = [...state.products];
        if (state.precio[1] !== 0)
          arr = arr.filter(
            (Element) =>
              state.precio[0] <= parseInt(Element.precio) &&
              state.precio[1] >= parseInt(Element.precio)
          );
        if (state.marca !== 'todas')
          arr = arr.filter((Element) => Element.marca.includes(state.marca));
        productsFilter = [...arr];
      } else {
        productsFilter = state.productsHome.filter((Element) =>
          Element.talla.includes(action.payload)
        );
      }
      return {
        ...state,
        productsHome: [...productsFilter],
        talla: action.payload,
      };
    }

    case SEARCHxPRECIO: {
      let productsFilter = [];
      if (action.payload[1] === 0) {
        let arr = [...state.products];
        if (state.marca !== 'todas')
          arr = arr.filter((Element) => Element.marca.includes(state.marca));
        if (state.talla !== 'todas')
          arr = arr.filter((Element) => Element.talla.includes(state.talla));
        productsFilter = [...arr];
      } else {
        productsFilter = state.productsHome.filter(
          (Element) =>
            action.payload[0] <= parseInt(Element.precio) &&
            action.payload[1] >= parseInt(Element.precio)
        );
      }
      return {
        ...state,
        productsHome: [...productsFilter],
        precio: [...action.payload],
      };
    }

    default:
      return { ...state };
  }
};

export default rootReducer;
