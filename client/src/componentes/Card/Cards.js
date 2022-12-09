import React from "react";
import Card from "./Card";


import img1 from '../assets/adidas-blanca.webp'
import img2 from '../assets/adidas-rosa.webp'
import img3 from '../assets/nike-blanca.webp'

const cards = [
    {
        id:1,
        title: 'Remera 1',
        branch: 'Adidas',
        price: '$ 15',
        color: 'blanca',
        description: 'Remera adidas deporte algodon',
        image: img1,
        url: 'https://www.adidas.com.ar/'
    },
    {
        id:2,
        title: 'Remera 2',
        branch: 'Adidas',
        price: '$ 10',
        color: 'rosa',
        
        image: img2,
        url: 'https://www.adidas.com.ar/'
    },
    {
        id:3,
        title: 'Remera 3',
        branch: 'Nike',
        price: '$ 12',
        color: 'blanca',
        description: 'Remera nike deporte algodon',
        image: img3,
        url: 'https://www.adidas.com.ar/'
    }
]

function Cards(){
    return(
        <div className="container d-flex justify-content-center h-100 align-items-center">
            <div className="row">
                {
                    cards.map(card => (
                        <div className="col-md-4" key={card.id}>
                            <Card title={card.title} imgSource={card.image} branch={card.branch} price={card.price} color={card.color} description={card.description} url={card.url}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cards