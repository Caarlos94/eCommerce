const Products = JSON.parse(`{
    "Productos": [
        {
          "URL": "https://www.tienda.quonam.com.ar/media/catalog/product/cache/d38be127ecf06dfec35606e11d013cfe/2/4/24-ED6053-AZUL_1_6.jpg",
          "color": "azul",
          "marca": "adidas",
          "precio": "25 usd$",
          "talla": "L",
          "categoria": "Camperas"
        },
        {
          "URL": "https://www.moov.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw82ec78d0/products/NI_CJ4888-657/NI_CJ4888-657-1.JPG",
          "color": "rojo",
          "marca": "nike",
          "precio": "23 usd$",
          "talla": "M",
          "categoria": "Camperas"
        },
        {
          "URL": "https://sporting.vtexassets.com/arquivos/ids/246066-800-800?v=637496895161670000&width=800&height=800&aspect=true",
          "color": "negro",
          "marca": "puma",
          "precio": "27 usd$",
          "talla": "xl",
          "categoria": "Camperas"
        },
        {
          "URL": "https://http2.mlstatic.com/D_NQ_NP_645553-MLA46896608019_072021-W.jpg",
          "color": "blanco",
          "marca": "Reusch",
          "precio": "19 usd$",
          "talla": "xxl",
          "categoria": "Camperas"
        },
        {
          "URL": "https://www.tradeinn.com/f/13822/138225338/le-coq-sportif-sudadera-con-capucha-as-saint-etienne-presentacion.jpg",
          "color": "verde",
          "marca": "le coq sportif",
          "precio": "20 usd$",
          "talla": "L",
          "categoria": "Camperas"
        },
        {
          "URL": "https://http2.mlstatic.com/D_NQ_NP_894119-MLA51167063420_082022-O.jpg",
          "color": "negro",
          "marca": "nike",
          "precio": "15 usd$",
          "talla": 42,
          "categoria": "Pantalones"
        },
        {
          "URL": "https://m.media-amazon.com/images/I/3143m1jhunL._SL500_.jpg",
          "color": "blanco",
          "marca": "adidas",
          "precio": "17 usd",
          "talla": "44",
          "categoria": "Pantalones"
        },
        {
          "URL": "https://m.media-amazon.com/images/I/71czpl8TjzL._AC_UY1000_.jpg",
          "color": "rojo",
          "marca": "puma",
          "precio": "22 usd$",
          "talla": 48,
          "categoria": "Pantalones"
        },
        {
          "URL": "https://sportotalar.vtexassets.com/arquivos/ids/364023-800-auto?v=637922829172100000&width=800&height=auto&aspect=true",
          "color": "azul",
          "marca": "humbre",
          "precio": "13 usd$",
          "talla": 46,
          "categoria": "Pantalones"
        },
        {
          "URL": "https://static.dafiti.com.ar/p/le-coq-sportif-7162-413144-1-product.jpg",
          "color": "gris",
          "marca": "le coq sportif",
          "precio": "17 usd$",
          "talla": 52,
          "categoria": "Pantalones"
        },
        {
          "color": "Rojo",
          "marca": "Nike",
          "precio": 20,
          "talla": "L",
          "URL": "https://static.dafiti.com.ar/p/nike-3465-299893-1-product.jpg",
          "categoria": "Remeras"
        },
        {
          "color": "Verde",
          "marca": "Nike",
          "precio": 5,
          "talla": "M",
          "URL": "https://static.dafiti.com.ar/p/nike-2456-370762-1-product.jpg",
          "categoria": "Remeras"
        },
        {
          "color": "Rojo",
          "marca": "Adidas",
          "precio": 5,
          "talla": "CH",
          "URL": "https://static.dafiti.com.br/p/adidas-Originals-Camiseta-adidas-Originals-3-Stripes-Vermelha/Branca-2199-7958325-1-zoom.jpg",
          "categoria": "Remeras"
        },
        {
          "color": "Azul",
          "marca": "Adidas",
          "precio": 15,
          "talla": "XL",
          "URL": "https://static.dafiti.com.ar/p/adidasoriginals-2604-968833-1-product.jpg",
          "categoria": "Remeras"
        },
        {
          "color": "Azul",
          "marca": "Nike",
          "precio": 10,
          "talla": "L",
          "URL": "http://d2r9epyceweg5n.cloudfront.net/stores/001/954/212/products/d1f470f8-d791-4f5b-a312-5b85e60a01d41-c094113f08c458041e16405476884577-640-0.jpg",
          "categoria": "Remeras"
        },
        {
          "URL": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d3b276d3-aec0-4d7b-911c-bd7ee42a3e7f/shorts-pro-flex-vent-max-PjJ4sM.png",
          "color": "negro",
          "marca": "nike",
          "precio": "12 usd$",
          "talla": "L",
          "categoria": "Shorts"
        },
        {
          "URL": "https://sportotalar.vteximg.com.br/arquivos/ids/270373-400-400/GN5773-1074-Blanco_1.jpg?v=637617810373430000",
          "color": "blanco",
          "marca": "adidas",
          "precio": "13 usd$",
          "talla": "M",
          "categoria": "Shorts"
        },
        {
          "URL": "https://callem.com.ar/wp-content/uploads/2022/11/MTH99_84799903-1-1.jpg",
          "color": "gris",
          "marca": "puma",
          "precio": " 14 usd$",
          "talla": "XL",
          "categoria": "Shorts"
        },
        {
          "URL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQchtQSd1ev_bV_3Ja3X3IULhanBykrYJGHOMfcTAMJzU1oWSWwhPAn35OwCBQJOLYRfwg&usqp=CAU",
          "color": "rojo",
          "marca": "humbro",
          "precio": " 16 usd$",
          "talla": "S",
          "categoria": "Shorts"
        },
        {
          "URL": "https://www.tradeinn.com/f/13638/136389719/le-coq-sportif-pantalones-cortos-tennis.jpg",
          "color": "azul",
          "marca": "le coq sportif",
          "precio": "17 usd$",
          "talla": "M",
          "categoria": "Shorts"
        },
        {
          "color": "Amarillo",
          "marca": "Adidas",
          "precio": 90,
          "URL": "https://assets.adidas.com/images/w_600,f_auto,q_auto/94cf8640ea33473f829fad82011eada1_9366/Chimpunes_X_Speedflow_Messi.4_Multiterreno_Dorado_GW7426_01_standard.jpg",
          "talla": 50,
          "categoria":"Zapatillas"
        },
        {
          "color": "Blanco",
          "marca": "Nike",
          "precio": 110,
          "talla": 55,
          "URL": "https://www.venta-de.com.pe/sh-img/chimpunes-nike-mercurial-victory-vi-df-100-originales--D_NQ_NP_823351-MPE26362497921_112017-F_chimpunes%2Bnike%2Bcr7.jpg",
          "categoria":"Zapatillas"
        },
        {
          "color": "Azul",
          "marca": "Puma",
          "precio": 100,
          "talla": 50,
          "URL": "https://http2.mlstatic.com/D_NQ_NP_866940-MPE48049582083_102021-O.jpg",
          "categoria":"Zapatillas"
        },
        {
          "color": "Negro",
          "marca": "Nike",
          "precio": 150,
          "talla": 50,
          "URL": "https://marcadegol.com/fotos//2014/10/Nike-Mercurial-Superfly-IV-Vapor-X-CR7-Gala-03.jpg",
          "categoria":"Zapatillas"
        },
        {
          "color": "Blanco",
          "marca": "Adidas",
          "precio": 150,
          "talla": 50,
          "URL": "https://pasefiltrado.pe/wp-content/uploads/2022/10/Adidas.jpg",
          "categoria":"Zapatillas"
        }
      ]
  }`)

export default Products;
