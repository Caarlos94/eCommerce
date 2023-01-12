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
  ORDER_PRECIO,
  GET_USER,
  ADD_TO_CART,
  ADD_ONE_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  REMOVE_FROM_FAVORITE,
  GET_REVIEWS,
  GET_FAVORITES,
  GET_CARRITO,
  ADD_PAGINATE
} from "../actions/actions.js";

const initialState = {
  products: [],
  productsHome: [],
  favorites: [],
  details: [],
  users: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  categorys: [],
  reviews: [],
  categoria: "todas",
  ordenamiento: "ninguno",
  marca: "todas",
  talla: "todas",
  precio: [0, 0],
  error: false,
  page: 1,
  paginate: 1
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      //console.log(action.payload);
      if (
        state.products.length === 0 ||
        action.payload[1] === "volver a cargar los productos"
      ) {
        return {
          ...state,
          products: [...action.payload[0]],
          productsHome: [...action.payload[0]],
          categoria: "todas",
          ordenamiento: "ninguno",
          marca: "todas",
          talla: "todas",
          precio: [0, 0],
        };
      }
      return {
        ...state,
        products: [...state.products],
        productsHome: [...state.productsHome],
      };
    }

    case GET_CATEGORYS:
      return {
        ...state,
        categorys: action.payload,
      };

    case GET_USER:
      console.log(action.payload);
      return {
        ...state,
        users: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case LIMPIAR_SATE:
      return {
        ...state,
        details: [],
      };
    case GET_CARRITO:
      return {
        ...state,
        cart: action.payload,
      };

    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload.productos,
      };

    case "POST_FAVORITE":
      return {
        ...state,
        favorites: action.payload,
      };

    case "POST_PROD":
      return {
        ...state,
        products: action.payload,
      };

    case "POST_CATEGORY":
      return {
        ...state,
        categorys: action.payload,
      };

    case "DELETE_PROD":
      return {
        ...state,
        productsHome: state.productsHome.filter(
          (prod) => prod.id !== action.payload
        ),
        products: state.products.filter((prod) => prod.id !== action.payload),
      };

    case SEARCHxNAME: {
      const productsFilter = state.products.filter((Element) =>
        Element.nombre.toLowerCase().includes(action.payload.toLowerCase())
      );

      if (productsFilter.length === 0) {
        return {
          ...state,
          error: true,
        };
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
        error: false,
      };
    }

    case ORDER_PRECIO:
      const arrPrecio =
        action.payload === "asc"
          ? state.productsHome.sort((a, b) => {
            //compara dos valores, en este caso los dos precios
            if (parseInt(a.precio) > parseInt(b.precio)) return 1; //los va posicionando a la derecha
            if (parseInt(a.precio) < parseInt(b.precio)) return -1; //o a la izquierda
            return 0; //o si son iguales los deja así
          })
          : state.productsHome.sort((a, b) => {
            if (parseInt(a.precio) > parseInt(b.precio)) return -1;
            if (parseInt(a.precio) < parseInt(b.precio)) return 1;
            return 0;
          });
      return {
        ...state,
        productsHome: [...arrPrecio],
        ordenamiento: action.payload,
      };

    case SEARCHxCATEGORIA: {
      let arr = [...state.products];
      let productsFilter = [];

      if (action.payload === "todas") {
        arr = [...state.products];
        if (state.precio[1] !== 0)
          arr = arr.filter(
            (Element) =>
              state.precio[0] <= parseInt(Element.precio) &&
              state.precio[1] >= parseInt(Element.precio)
          );
        if (state.talla !== "todas")
          arr = arr.filter((Element) => Element.talla.includes(state.talla));
        if (state.marca !== "todas")
          arr = arr.filter((Element) => Element.marca.includes(state.marca));
        productsFilter = [...arr];
      } else {
        let arr = [...state.products];
        arr = arr.filter((Element) =>
          Element.categoria.includes(action.payload)
        );
        if (state.precio[1] !== 0)
          arr = arr.filter(
            (Element) =>
              state.precio[0] <= parseInt(Element.precio) &&
              state.precio[1] >= parseInt(Element.precio)
          );
        if (state.talla !== "todas")
          arr = arr.filter((Element) => Element.talla.includes(state.talla));
        if (state.marca !== "todas")
          arr = arr.filter((Element) => Element.marca.includes(state.marca));
        productsFilter = [...arr];
      }

      let setError = "";

      if (productsFilter.length === 0) {
        setError = true;
      } else {
        setError = false;
      }

      if (state.ordenamiento === "asc") {
        productsFilter = productsFilter.sort((a, b) => {
          //el valor A va antes que el B ya que A es menor(negativo significa que el valor A va antes que B)
          if (parseInt(a.precio) > parseInt(b.precio)) return 1;
          //el valor B va antes que el A ya que A es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) < parseInt(b.precio)) return -1;
          //deja todo igual
          return 0;
        });
      }
      if (state.ordenamiento === "desc") {
        productsFilter = productsFilter.sort((a, b) => {
          //el valor B va antes que el A ya que B es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) < parseInt(b.precio)) return 1;
          //el valor B va antes que el A ya que A es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) > parseInt(b.precio)) return -1;
          //deja todo igual
          return 0;
        });
      }

      return {
        ...state,
        productsHome: [...productsFilter],
        categoria: action.payload,
        error: setError,
      };
    }

    case SEARCHxMARCA: {
      let productsFilter = [];
      if (action.payload === "todas") {
        let arr = [...state.products];
        if (state.precio[1] !== 0)
          arr = arr.filter(
            (Element) =>
              state.precio[0] <= parseInt(Element.precio) &&
              state.precio[1] >= parseInt(Element.precio)
          );
        if (state.talla !== "todas")
          arr = arr.filter((Element) => Element.talla.includes(state.talla));
        if (state.categoria !== "todas")
          arr = arr.filter((Element) =>
            Element.categoria.includes(state.categoria)
          );
        productsFilter = [...arr];
      } else {
        let arr = [...state.products];
        arr = arr.filter((Element) =>
          Element.marca.toLowerCase().includes(action.payload.toLowerCase())
        );
        if (state.talla !== "todas")
          arr = arr.filter((Element) => Element.talla.includes(state.talla));
        if (state.precio[1] !== 0)
          arr = arr.filter(
            (Element) =>
              state.precio[0] <= parseInt(Element.precio) &&
              state.precio[1] >= parseInt(Element.precio)
          );
        if (state.categoria !== "todas")
          arr = arr.filter((Element) =>
            Element.categoria.includes(state.categoria)
          );
        productsFilter = [...arr];
      }

      let setError = "";

      if (productsFilter.length === 0) {
        setError = true;
      } else {
        setError = false;
      }

      if (state.ordenamiento === "asc") {
        productsFilter = productsFilter.sort((a, b) => {
          //el valor A va antes que el B ya que A es menor(negativo significa que el valor A va antes que B)
          if (parseInt(a.precio) > parseInt(b.precio)) return 1;
          //el valor B va antes que el A ya que A es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) < parseInt(b.precio)) return -1;
          //deja todo igual
          return 0;
        });
      }
      if (state.ordenamiento === "desc") {
        productsFilter = productsFilter.sort((a, b) => {
          //el valor B va antes que el A ya que B es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) < parseInt(b.precio)) return 1;
          //el valor B va antes que el A ya que A es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) > parseInt(b.precio)) return -1;
          //deja todo igual
          return 0;
        });
      }

      return {
        ...state,
        productsHome: [...productsFilter],
        marca: action.payload,
        error: setError,
      };
    }

    case SEARCHxTALLA: {
      let productsFilter = [];
      if (action.payload === "todas") {
        let arr = [...state.products];
        if (state.precio[1] !== 0)
          arr = arr.filter(
            (Element) =>
              state.precio[0] <= parseInt(Element.precio) &&
              state.precio[1] >= parseInt(Element.precio)
          );
        if (state.marca !== "todas")
          arr = arr.filter((Element) => Element.marca.includes(state.marca));
        if (state.categoria !== "todas")
          arr = arr.filter((Element) =>
            Element.categoria.includes(state.categoria)
          );
        productsFilter = [...arr];
      } else {
        let arr = [...state.products];
        arr = arr.filter(
          (Element) =>
            Element.talla.toLowerCase() === action.payload.toLowerCase()
        );
        if (state.marca !== "todas")
          arr = arr.filter((Element) => Element.marca.includes(state.marca));
        if (state.precio[1] !== 0)
          arr = arr.filter(
            (Element) =>
              state.precio[0] <= parseInt(Element.precio) &&
              state.precio[1] >= parseInt(Element.precio)
          );
        if (state.categoria !== "todas")
          arr = arr.filter((Element) =>
            Element.categoria.includes(state.categoria)
          );
        productsFilter = [...arr];
      }

      let setError = "";

      if (productsFilter.length === 0) {
        setError = true;
      } else {
        setError = false;
      }

      if (state.ordenamiento === "asc") {
        productsFilter = productsFilter.sort((a, b) => {
          //el valor A va antes que el B ya que A es menor(negativo significa que el valor A va antes que B)
          if (parseInt(a.precio) > parseInt(b.precio)) return 1;
          //el valor B va antes que el A ya que A es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) < parseInt(b.precio)) return -1;
          //deja todo igual
          return 0;
        });
      }
      if (state.ordenamiento === "desc") {
        productsFilter = productsFilter.sort((a, b) => {
          //el valor B va antes que el A ya que B es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) < parseInt(b.precio)) return 1;
          //el valor B va antes que el A ya que A es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) > parseInt(b.precio)) return -1;
          //deja todo igual
          return 0;
        });
      }

      return {
        ...state,
        productsHome: [...productsFilter],
        talla: action.payload,
        error: setError,
      };
    }

    case SEARCHxPRECIO: {
      let arr = [...state.products];
      if (action.payload[1] === 0) {
        arr = [...state.products];
        if (state.marca !== "todas")
          arr = arr.filter((Element) => Element.marca.includes(state.marca));
        if (state.talla !== "todas")
          arr = arr.filter((Element) => Element.talla.includes(state.talla));
        if (state.categoria !== "todas")
          arr = arr.filter((Element) =>
            Element.categoria.includes(state.categoria)
          );
        arr = [...arr];
      } else {
        arr = arr.filter(
          (Element) =>
            action.payload[0] <= parseInt(Element.precio) &&
            action.payload[1] >= parseInt(Element.precio)
        );
        if (state.marca !== "todas")
          arr = arr.filter((Element) => Element.marca.includes(state.marca));
        if (state.talla !== "todas")
          arr = arr.filter((Element) => Element.talla.includes(state.talla));
        if (state.categoria !== "todas")
          arr = arr.filter((Element) =>
            Element.categoria.includes(state.categoria)
          );
      }

      let setError = "";

      if (arr.length === 0) {
        setError = true;
      } else {
        setError = false;
      }

      if (state.ordenamiento === "asc") {
        arr = arr.sort((a, b) => {
          //el valor A va antes que el B ya que A es menor(negativo significa que el valor A va antes que B)
          if (parseInt(a.precio) > parseInt(b.precio)) return 1;
          //el valor B va antes que el A ya que A es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) < parseInt(b.precio)) return -1;
          //deja todo igual
          return 0;
        });
      }
      if (state.ordenamiento === "desc") {
        arr = arr.sort((a, b) => {
          //el valor B va antes que el A ya que B es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) < parseInt(b.precio)) return 1;
          //el valor B va antes que el A ya que A es mayor(positivo significa que el valor B va antes que A)
          if (parseInt(a.precio) > parseInt(b.precio)) return -1;
          //deja todo igual
          return 0;
        });
      }

      return {
        ...state,
        productsHome: [...arr],
        precio: [...action.payload],
        error: setError,
      };
    }
    case ADD_TO_CART:
      let newProduct = state.details.find(
        (product) => product.id === action.payload
      );

      let productInCart = state.cart.find(
        (product) => product.id === newProduct.id
      );

      if (productInCart) {
        state = {
          ...state,
          cart: state.cart.map((c) =>
            c.id === newProduct.id ? { ...c, cantidad: c.cantidad + 1 } : c
          ),
        };
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        state = {
          ...state,
          cart: [...state.cart, { ...newProduct, cantidad: 1 }],
        };
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }

      return state;

    case REMOVE_ONE_FROM_CART:
      let productToDelete = state.cart.find(
        (product) => product.id === action.payload
      );

      if (productToDelete.cantidad > 1) {
        state = {
          ...state,
          cart: state.cart.map((c) =>
            c.id === action.payload ? { ...c, cantidad: c.cantidad - 1 } : c
          ),
        };
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        state = {
          ...state,
          cart: state.cart.filter((c) => c.id !== action.payload),
        };
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }

      return state;

    case ADD_ONE_TO_CART:
      let productToAdd = state.cart.find(
        (product) => product.id === action.payload
      );

      if (productToAdd.cantidad >= 1) {
        state = {
          ...state,
          cart: state.cart.map((c) =>
            c.id === action.payload ? { ...c, cantidad: c.cantidad + 1 } : c
          ),
        };
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        state = {
          ...state,
          cart: state.cart.filter((c) => c.id !== action.payload),
        };
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
      return state;

    case REMOVE_ALL_FROM_CART:
      state = {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload),
      };
      localStorage.setItem("cart", JSON.stringify(state.cart));

      return state;

    case CLEAR_CART:
      state = {
        ...state,
        cart: [],
      };
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return state;

    case ADD_PAGINATE:
      state = {
        ...state,
        paginate: action.payload
      };


      return state;

    case REMOVE_FROM_FAVORITE:
      let productToRemove = state.favorites.find(
        (product) => product.id === action.payload
      );
      return {
        ...state,
        favorites: state.favorites.filter(
          (product) => product.id !== productToRemove.id
        ),
      };

    default:
      return { ...state };
  }
};

export default rootReducer;