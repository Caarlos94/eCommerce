import {
  GET_PRODUCTS,
  SEARCHxNAME,
  SEARCHxMARCA,
  SEARCHxPRECIO,
  SEARCHxTALLA,
  GET_CATEGORYS,
  GET_DETAILS,
  LIMPIAR_SATE,
  SEARCHxCATEGORIA,
  EMPTY_ERROR,
} from '../actions/actions.js'


const initialState = {
  products: [],
  productsHome: [],
  details: [],
  categorys: [],
  marca: 'todas',
  talla: 'todas',
  categoria: 'todas',
  precio: [0, 0],
  error: false,
};


const rootReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_PRODUCTS: {
      if (state.products.length === 0) {
        return {
          ...state,
          products: [...action.payload],
          productsHome: [...action.payload],
        }
      } break
    }
    case GET_CATEGORYS:
      return {
        ...state,
        categorys: action.payload,
      }

    case GET_DETAILS:
      console.log(action.payload);
      return {
        ...state,
        details: action.payload,
      }

    case LIMPIAR_SATE:
      return {
        ...state,
        details: [],
      }

    case 'POST_PROD':
      return {
        ...state,
        products: action.payload,
      }

    case SEARCHxNAME: {
      const productsFilter = state.products.filter(Element => Element.nombre.toLowerCase().includes(action.payload.toLowerCase()))

      if (productsFilter.length === 0) {
        return {
          ...state,
          error: true
        }
      } else {
        return {
          ...state,
          productsHome: [...productsFilter],
        };
      }
    }

    case EMPTY_ERROR: {
      return {
        ...state,
        error: false
      }
    }

    case SEARCHxCATEGORIA: {
      let productsFilter = [];
      if (action.payload === 'todas') {
        let arr = [...state.products]
        if (state.precio[1] !== 0) arr = arr.filter(Element => state.precio[0] <= parseInt(Element.precio) && state.precio[1] >= parseInt(Element.precio))
        if (state.talla !== 'todas') arr = arr.filter(Element => Element.talla.includes(state.talla));
        if (state.marca !== 'todas') arr = arr.filter(Element => Element.marca.includes(state.marca));
        productsFilter = [...arr]
      }
      else {
        let arr = [...state.products]
        arr = arr.filter(Element => Element.categoria.includes(action.payload));
        if (state.precio[1] !== 0) arr = arr.filter(Element => state.precio[0] <= parseInt(Element.precio) && state.precio[1] >= parseInt(Element.precio))
        if (state.talla !== 'todas') arr = arr.filter(Element => Element.talla.includes(state.talla));
        if (state.marca !== 'todas') arr = arr.filter(Element => Element.marca.includes(state.marca));
        productsFilter = [...arr]
      }

      if (productsFilter.length === 0) {
        return {
          ...state,
          error: true
        }
      } else {
        return {
          ...state,
          productsHome: [...productsFilter],
          categoria: action.payload
        }
      }
    }

    case SEARCHxMARCA: {
      let productsFilter = [];
      if (action.payload === 'todas') {
        let arr = [...state.products]
        if (state.precio[1] !== 0) arr = arr.filter(Element => state.precio[0] <= parseInt(Element.precio) && state.precio[1] >= parseInt(Element.precio))
        if (state.talla !== 'todas') arr = arr.filter(Element => Element.talla.includes(state.talla));
        if (state.categoria !== 'todas') arr = arr.filter(Element => Element.categoria.includes(state.categoria))
        productsFilter = [...arr]
      }
      else {
        let arr = [...state.products]
        arr = arr.filter(Element => Element.marca.toLowerCase().includes(action.payload.toLowerCase()));
        if (state.talla !== 'todas') arr = arr.filter(Element => Element.talla.includes(state.talla));
        if (state.precio[1] !== 0) arr = arr.filter(Element => state.precio[0] <= parseInt(Element.precio) && state.precio[1] >= parseInt(Element.precio))
        if (state.categoria !== 'todas') arr = arr.filter(Element => Element.categoria.includes(state.categoria))
        productsFilter = [...arr]
      }

      if (productsFilter.length === 0) {
        return {
          ...state,
          error: true
        }
      } else {
        return {
          ...state,
          productsHome: [...productsFilter],
          marca: action.payload
        }
      }
    }

    case SEARCHxTALLA: {
      let productsFilter = [];
      if (action.payload === 'todas') {
        let arr = [...state.products]
        if (state.precio[1] !== 0) arr = arr.filter(Element => state.precio[0] <= parseInt(Element.precio) && state.precio[1] >= parseInt(Element.precio))
        if (state.marca !== 'todas') arr = arr.filter(Element => Element.marca.includes(state.marca));
        if (state.categoria !== 'todas') arr = arr.filter(Element => Element.categoria.includes(state.categoria))
        productsFilter = [...arr]
      }
      else {
        let arr = [...state.products]
        arr = arr.filter(Element => Element.talla.toLowerCase() === action.payload.toLowerCase());
        if (state.marca !== 'todas') arr = arr.filter(Element => Element.marca.includes(state.marca));
        if (state.precio[1] !== 0) arr = arr.filter(Element => state.precio[0] <= parseInt(Element.precio) && state.precio[1] >= parseInt(Element.precio))
        if (state.categoria !== 'todas') arr = arr.filter(Element => Element.categoria.includes(state.categoria))
        productsFilter = [...arr]
      }

      if (productsFilter.length === 0) {
        return {
          ...state,
          error: true
        }
      } else {
        return {
          ...state,
          productsHome: [...productsFilter],
          talla: action.payload
        }
      }
    }

    case SEARCHxPRECIO: {
      let arr = [...state.products]
      if (action.payload[1] === 0) {
        arr = [...state.products]
        if (state.marca !== 'todas') arr = arr.filter(Element => Element.marca.includes(state.marca));
        if (state.talla !== 'todas') arr = arr.filter(Element => Element.talla.includes(state.talla));
        if (state.categoria !== 'todas') arr = arr.filter(Element => Element.categoria.includes(state.categoria))
        arr = [...arr]
      }
      else {
        arr = arr.filter(Element => action.payload[0] <= parseInt(Element.precio) && action.payload[1] >= parseInt(Element.precio))
        if (state.marca !== 'todas') arr = arr.filter(Element => Element.marca.includes(state.marca));
        if (state.talla !== 'todas') arr = arr.filter(Element => Element.talla.includes(state.talla));
        if (state.categoria !== 'todas') arr = arr.filter(Element => Element.categoria.includes(state.categoria))
      }

      if (arr.length === 0) {
        return {
          ...state,
          error: true
        }
      } else {
        return {
          ...state,
          productsHome: [...arr],
          precio: [...action.payload]
        }
      }
    }
    default:
      return { ...state };
  }
};

export default rootReducer;