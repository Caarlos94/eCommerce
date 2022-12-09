export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SEARCHxNAME = 'SEARCHxNAME';
export const SEARCHxMARCA = 'SEARCHxMARCA';
export const SEARCHxPRECIO = 'SEARCHxPRECIO';
export const SEARCHxTALLA = 'SEARCHxTALLA';

const sinInternet = [
	{
		"id": 1,
		"nombre": "Campera Deportiva Adidas",
		"URL": "https://www.tienda.quonam.com.ar/media/catalog/product/cache/d38be127ecf06dfec35606e11d013cfe/2/4/24-ED6053-AZUL_1_6.jpg",
		"precio": "25",
		"color": "azul",
		"talla": "L",
		"marca": "adidas"
	},
	{
		"id": 2,
		"nombre": "Campera Rompeviento Nike",
		"URL": "https://www.moov.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw82ec78d0/products/NI_CJ4888-657/NI_CJ4888-657-1.JPG",
		"precio": "23",
		"color": "rojo",
		"talla": "M",
		"marca": "nike"
	},
	{
		"id": 3,
		"nombre": "Campera Running Puma",
		"URL": "https://sporting.vtexassets.com/arquivos/ids/246066-800-800?v=637496895161670000&width=800&height=800&aspect=true",
		"precio": "27",
		"color": "negro",
		"talla": "xl",
		"marca": "puma"
	},
	{
		"id": 4,
		"nombre": "Campera Reusch de Tela",
		"URL": "https://http2.mlstatic.com/D_NQ_NP_645553-MLA46896608019_072021-W.jpg",
		"precio": "19",
		"color": "blanco",
		"talla": "xxl",
		"marca": "Reusch"
	},
	{
		"id": 5,
		"nombre": "Campera tipo Canguro  Le Coq Sportif",
		"URL": "https://www.tradeinn.com/f/13822/138225338/le-coq-sportif-sudadera-con-capucha-as-saint-etienne-presentacion.jpg",
		"precio": "20",
		"color": "verde",
		"talla": "L",
		"marca": "le coq sportif"
	},
	{
		"id": 6,
		"nombre": "Pantalon Jogging Nike",
		"URL": "https://http2.mlstatic.com/D_NQ_NP_894119-MLA51167063420_082022-O.jpg",
		"precio": "15",
		"color": "negro",
		"talla": "42",
		"marca": "nike"
	},
	{
		"id": 7,
		"nombre": "Pantalon Jogging Adidas",
		"URL": "https://m.media-amazon.com/images/I/3143m1jhunL._SL500_.jpg",
		"precio": "17 usd",
		"color": "blanco",
		"talla": "44",
		"marca": "adidas"
	},
	{
		"id": 8,
		"nombre": "Pantalon Jogging puma",
		"URL": "https://m.media-amazon.com/images/I/71czpl8TjzL._AC_UY1000_.jpg",
		"precio": "22",
		"color": "rojo",
		"talla": "48",
		"marca": "puma"
	},
	{
		"id": 9,
		"nombre": "Pantalon Jogging Umbro",
		"URL": "https://sportotalar.vtexassets.com/arquivos/ids/364023-800-auto?v=637922829172100000&width=800&height=auto&aspect=true",
		"precio": "13",
		"color": "azul",
		"talla": "46",
		"marca": "umbro"
	},
	{
		"id": 10,
		"nombre": "Pantalon Jogging Le Coq Sportif",
		"URL": "https://static.dafiti.com.ar/p/le-coq-sportif-7162-413144-1-product.jpg",
		"precio": "17",
		"color": "gris",
		"talla": "52",
		"marca": "le coq sportif"
	},
	{
		"id": 11,
		"nombre": "Remera Nike Casual",
		"URL": "https://static.dafiti.com.ar/p/nike-3465-299893-1-product.jpg",
		"precio": "20",
		"color": "Rojo",
		"talla": "L",
		"marca": "Nike"
	},
	{
		"id": 12,
		"nombre": "Remera Nike Sport",
		"URL": "https://static.dafiti.com.ar/p/nike-2456-370762-1-product.jpg",
		"precio": "5",
		"color": "Verde",
		"talla": "M",
		"marca": "Nike"
	},
	{
		"id": 13,
		"nombre": "Remera Adidas Casual",
		"URL": "https://static.dafiti.com.br/p/adidas-Originals-Camiseta-adidas-Originals-3-Stripes-Vermelha/Branca-2199-7958325-1-zoom.jpg",
		"precio": "5",
		"color": "Rojo",
		"talla": "CH",
		"marca": "Adidas"
	},
	{
		"id": 14,
		"nombre": "Remera Adidas Casual",
		"URL": "https://static.dafiti.com.ar/p/adidasoriginals-2604-968833-1-product.jpg",
		"precio": "15",
		"color": "Azul",
		"talla": "XL",
		"marca": "Adidas"
	},
	{
		"id": 15,
		"nombre": "Remera Nike Fit",
		"URL": "http://d2r9epyceweg5n.cloudfront.net/stores/001/954/212/products/d1f470f8-d791-4f5b-a312-5b85e60a01d41-c094113f08c458041e16405476884577-640-0.jpg",
		"precio": "10",
		"color": "Azul",
		"talla": "L",
		"marca": "Nike"
	},
	{
		"id": 16,
		"nombre": "Short Holgado Nike",
		"URL": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d3b276d3-aec0-4d7b-911c-bd7ee42a3e7f/shorts-pro-flex-vent-max-PjJ4sM.png",
		"precio": "12",
		"color": "negro",
		"talla": "L",
		"marca": "nike"
	},
	{
		"id": 17,
		"nombre": "Short Holgado Adidas",
		"URL": "https://sportotalar.vteximg.com.br/arquivos/ids/270373-400-400/GN5773-1074-Blanco_1.jpg?v=637617810373430000",
		"precio": "13",
		"color": "blanco",
		"talla": "M",
		"marca": "adidas"
	},
	{
		"id": 18,
		"nombre": "Short Tela Puma",
		"URL": "https://callem.com.ar/wp-content/uploads/2022/11/MTH99_84799903-1-1.jpg",
		"precio": "14",
		"color": "gris",
		"talla": "XL",
		"marca": "puma"
	},
	{
		"id": 19,
		"nombre": "Short Tela Umbro",
		"URL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQchtQSd1ev_bV_3Ja3X3IULhanBykrYJGHOMfcTAMJzU1oWSWwhPAn35OwCBQJOLYRfwg&usqp=CAU",
		"precio": "16",
		"color": "rojo",
		"talla": "S",
		"marca": "umbro"
	},
	{
		"id": 20,
		"nombre": "Botines Nike con Media",
		"URL": "https://www.venta-de.com.pe/sh-img/chimpunes-nike-mercurial-victory-vi-df-100-originales--D_NQ_NP_823351-MPE26362497921_112017-F_chimpunes%2Bnike%2Bcr7.jpg",
		"precio": "110",
		"color": "Blanco",
		"talla": "55",
		"marca": "Nike"
	},
	{
		"id": 21,
		"nombre": "Short Tela Le Coq Sportif",
		"URL": "https://www.tradeinn.com/f/13638/136389719/le-coq-sportif-pantalones-cortos-tennis.jpg",
		"precio": "17",
		"color": "azul",
		"talla": "M",
		"marca": "le coq sportif"
	},
	{
		"id": 22,
		"nombre": "Botines Adidas",
		"URL": "https://assets.adidas.com/images/w_600,f_auto,q_auto/94cf8640ea33473f829fad82011eada1_9366/Chimpunes_X_Speedflow_Messi.4_Multiterreno_Dorado_GW7426_01_standard.jpg",
		"precio": "90",
		"color": "Amarillo",
		"talla": "50",
		"marca": "Adidas"
	},
	{
		"id": 23,
		"nombre": "Botines Puma",
		"URL": "https://http2.mlstatic.com/D_NQ_NP_866940-MPE48049582083_102021-O.jpg",
		"precio": "100",
		"color": "Azul",
		"talla": "50",
		"marca": "Puma"
	},
	{
		"id": 24,
		"nombre": "Botines Nike con Media",
		"URL": "https://marcadegol.com/fotos//2014/10/Nike-Mercurial-Superfly-IV-Vapor-X-CR7-Gala-03.jpg",
		"precio": "150",
		"color": "Negro",
		"talla": "50",
		"marca": "Nike"
	},
	{
		"id": 25,
		"nombre": "Botines Adidas",
		"URL": "https://pasefiltrado.pe/wp-content/uploads/2022/10/Adidas.jpg",
		"precio": "150",
		"color": "Blanco",
		"talla": "50",
		"marca": "Adidas"
	}
]

export const getProducts = () => { 
  // return function(dispatch) {
  //        return fetch("http://localhost:3001/products")
  //            .then(response => response.json())
  //            .then(data => dispatch({ type: GET_PRODUCTS , payload: data }))
  //        };
  return{ type: GET_PRODUCTS ,
    payload: sinInternet
}
};

export const searchXname = (name) => { 
  return{ type: SEARCHxNAME ,
          payload: name
      }
}

export const searchXmarca = (marca) => { 
  console.log('hola soy marca');
  return{ type: SEARCHxMARCA ,
          payload: marca
      }
}

export const searchXprecio = (precio) => { 


//precio llega como un string
//lo convierto en un arreglo con el metodo split
 const arr = precio.split(',');


 //los valores del arreglo anterior siguen siendo string
 //mapeo el arreglo anterior y cada indice se convierte en number
 const arr2 = arr.map(element =>  parseInt(element));


  return{ type: SEARCHxPRECIO ,
          payload: arr2
      }
}

export const searchXtalla = (talla) => { 
  return{ type: SEARCHxTALLA ,
          payload: talla
      }
}



