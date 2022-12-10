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




let sinInternet = [
	{
		"URL": "https://www.tienda.quonam.com.ar/media/catalog/product/cache/d38be127ecf06dfec35606e11d013cfe/2/4/24-ED6053-AZUL_1_6.jpg",
		"categoria": "Camperas",
		"color": "Azul",
		"id": "1",
		"marca": "Adidas",
		"nombre": "Campera Deportiva Adidas",
		"precio": "25",
		"talla": "L"
	},
	{
		"URL": "https://www.moov.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw82ec78d0/products/NI_CJ4888-657/NI_CJ4888-657-1.JPG",
		"categoria": "Camperas",
		"color": "Rojo",
		"id": "2",
		"marca": "Nike",
		"nombre": "Campera Rompeviento Nike",
		"precio": "23",
		"talla": "M"
	},
	{
		"URL": "https://sporting.vtexassets.com/arquivos/ids/246066-800-800?v=637496895161670000&width=800&height=800&aspect=true",
		"categoria": "Camperas",
		"color": "Negro",
		"id": "3",
		"marca": "Puma",
		"nombre": "Campera Running Puma",
		"precio": "27",
		"talla": "XL"
	},
	{
		"URL": "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/c/a/campera-puma-iconic-t7-track-rojo-640020530094011-1.jpg",
		"categoria": "Camperas",
		"color": "Banco",
		"id": "4",
		"marca": "Puma",
		"nombre": "Campera Puma de Tela",
		"precio": "19",
		"talla": "XXL"
	},
	{
		"URL": "https://www.tradeinn.com/f/13822/138225338/le-coq-sportif-sudadera-con-capucha-as-saint-etienne-presentacion.jpg",
		"categoria": "Camperas",
		"color": "Verde",
		"id": "5",
		"marca": "Le Coq Sportif",
		"nombre": "Campera tipo Canguro  Le Coq Sportif",
		"precio": "20",
		"talla": "L"
	},
	{
		"URL": "https://http2.mlstatic.com/D_NQ_NP_894119-MLA51167063420_082022-O.jpg",
		"categoria": "Pantalones",
		"color": "Negro",
		"id": "6",
		"marca": "Nike",
		"nombre": "Pantalon Jogging Nike",
		"precio": "15",
		"talla": "L"
	},
	{
		"URL": "https://m.media-amazon.com/images/I/3143m1jhunL._SL500_.jpg",
		"categoria": "Pantalones",
		"color": "blanco",
		"id": "7",
		"marca": "Adidas",
		"nombre": "Pantalon Jogging Adidas",
		"precio": "17",
		"talla": "XL"
	},
	{
		"URL": "https://m.media-amazon.com/images/I/71czpl8TjzL._AC_UY1000_.jpg",
		"categoria": "Pantalones",
		"color": "Rojo",
		"id": "8",
		"marca": "Puma",
		"nombre": "Pantalon Jogging puma",
		"precio": "22",
		"talla": "48"
	},
	{
		"URL": "https://sportotalar.vtexassets.com/arquivos/ids/364023-800-auto?v=637922829172100000&width=800&height=auto&aspect=true",
		"categoria": "Pantalones",
		"color": "Azul",
		"id": "9",
		"marca": "Umbro",
		"nombre": "Pantalon Jogging Umbro",
		"precio": "13",
		"talla": "M"
	},
	{
		"URL": "https://static.dafiti.com.ar/p/le-coq-sportif-7162-413144-1-product.jpg",
		"categoria": "Pantalones",
		"color": "Gris",
		"id": "10",
		"marca": "Le Coq Sportif",
		"nombre": "Pantalon Jogging Le Coq Sportif",
		"precio": "17",
		"talla": "L"
	},
	{
		"URL": "https://static.dafiti.com.ar/p/nike-3465-299893-1-product.jpg",
		"categoria": "Remeras",
		"color": "Rojo",
		"id": "11",
		"marca": "Nike",
		"nombre": "Remera Nike Casual",
		"precio": "20",
		"talla": "L"
	},
	{
		"URL": "https://static.dafiti.com.ar/p/nike-2456-370762-1-product.jpg",
		"categoria": "Remeras",
		"color": "Verde",
		"id": "12",
		"marca": "Nike",
		"nombre": "Remera Nike Sport",
		"precio": "5",
		"talla": "M"
	},
	{
		"URL": "https://static.dafiti.com.br/p/adidas-Originals-Camiseta-adidas-Originals-3-Stripes-Vermelha/Branca-2199-7958325-1-zoom.jpg",
		"categoria": "Remeras",
		"color": "Rojo",
		"id": "13",
		"marca": "Adidas",
		"nombre": "Remera Adidas Casual",
		"precio": "5",
		"talla": "L"
	},
	{
		"URL": "https://static.dafiti.com.ar/p/adidasoriginals-2604-968833-1-product.jpg",
		"categoria": "Remeras",
		"color": "Azul",
		"id": "14",
		"marca": "Adidas",
		"nombre": "Remera Adidas Casual",
		"precio": "15",
		"talla": "XL"
	},
	{
		"URL": "http://d2r9epyceweg5n.cloudfront.net/stores/001/954/212/products/d1f470f8-d791-4f5b-a312-5b85e60a01d41-c094113f08c458041e16405476884577-640-0.jpg",
		"categoria": "Remeras",
		"color": "Azul",
		"id": "15",
		"marca": "Nike",
		"nombre": "Remera Nike Fit",
		"precio": "10",
		"talla": "L"
	},
	{
		"URL": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d3b276d3-aec0-4d7b-911c-bd7ee42a3e7f/shorts-pro-flex-vent-max-PjJ4sM.png",
		"categoria": "Shorts",
		"color": "Negro",
		"id": "16",
		"marca": "Nike",
		"nombre": "Short Holgado Nike",
		"precio": "12",
		"talla": "L"
	},
	{
		"URL": "https://sportotalar.vteximg.com.br/arquivos/ids/270373-400-400/GN5773-1074-Blanco_1.jpg?v=637617810373430000",
		"categoria": "Shorts",
		"color": "Blanco",
		"id": "17",
		"marca": "Adidas",
		"nombre": "Short Holgado Adidas",
		"precio": "13",
		"talla": "M"
	},
	{
		"URL": "https://callem.com.ar/wp-content/uploads/2022/11/MTH99_84799903-1-1.jpg",
		"categoria": "Shorts",
		"color": "Gris",
		"id": "18",
		"marca": "Puma",
		"nombre": "Short Tela Puma",
		"precio": "14",
		"talla": "XL"
	},
	{
		"URL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQchtQSd1ev_bV_3Ja3X3IULhanBykrYJGHOMfcTAMJzU1oWSWwhPAn35OwCBQJOLYRfwg&usqp=CAU",
		"categoria": "Shorts",
		"color": "Rojo",
		"id": "19",
		"marca": "Umbro",
		"nombre": "Short de Tela Umbro",
		"precio": "16",
		"talla": "S"
	},
	{
		"URL": "https://www.tradeinn.com/f/13638/136389719/le-coq-sportif-pantalones-cortos-tennis.jpg",
		"categoria": "Shorts",
		"color": "Azul",
		"id": "20",
		"marca": "Le Coq Sportif",
		"nombre": "Short Tela Le Coq Sportif",
		"precio": "17",
		"talla": "M"
	},
	{
		"URL": "https://assets.adidas.com/images/w_600,f_auto,q_auto/94cf8640ea33473f829fad82011eada1_9366/Chimpunes_X_Speedflow_Messi.4_Multiterreno_Dorado_GW7426_01_standard.jpg",
		"categoria": "Zapatillas",
		"color": "Amarillo",
		"id": "21",
		"marca": "Adidas",
		"nombre": "Botines Adidas",
		"precio": "90",
		"talla": "S"
	},
	{
		"URL": "https://www.venta-de.com.pe/sh-img/chimpunes-nike-mercurial-victory-vi-df-100-originales--D_NQ_NP_823351-MPE26362497921_112017-F_chimpunes%2Bnike%2Bcr7.jpg",
		"categoria": "Zapatillas",
		"color": "Blanco",
		"id": "22",
		"marca": "Nike",
		"nombre": "Botines Nike con Media",
		"precio": "110",
		"talla": "L"
	},
	{
		"URL": "https://http2.mlstatic.com/D_NQ_NP_866940-MPE48049582083_102021-O.jpg",
		"categoria": "Zapatillas",
		"color": "Azul",
		"id": "23",
		"marca": "Puma",
		"nombre": "Botines Puma",
		"precio": "100",
		"talla": "M"
	},
	{
		"URL": "https://marcadegol.com/fotos//2014/10/Nike-Mercurial-Superfly-IV-Vapor-X-CR7-Gala-03.jpg",
		"categoria": "Zapatillas",
		"color": "Negro",
		"id": "24",
		"marca": "Nike",
		"nombre": "Botines Nike con Media",
		"precio": "150",
		"talla": "XL"
	},
	{
		"URL": "https://pasefiltrado.pe/wp-content/uploads/2022/10/Adidas.jpg",
		"categoria": "Zapatillas",
		"color": "Blanco",
		"id": "25",
		"marca": "Adidas",
		"nombre": "Botines Adidas",
		"precio": "150",
		"talla": "L"
	},
	{
		"id": "5a9f5360-78b8-11ed-83cd-71d8a9681557",
		"nombre": "remera adidas",
		"URL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJskADC8TpWztSVSaAbigU27iWrhxK3K2hoKaa9VDMX5YS0u2rmiWhVcAL2iYtjZuC4Bw&usqp=CAU",
		"precio": "17",
		"color": "blanca y celeste",
		"talla": "L",
		"marca": "Adidas",
		"categoria": "Remeras"
	}
]


export const getProducts = () => {
  // return function (dispatch) {
  //   return fetch("http://localhost:3001/products")
  //     .then(response => response.json())
  //     .then(data => dispatch({ type: GET_PRODUCTS, payload: data }))
  // };
  return {
    type: GET_PRODUCTS,
    payload: sinInternet,
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

