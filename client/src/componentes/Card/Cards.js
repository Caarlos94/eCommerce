import React from "react";
import Card from "./Card";

import { useSelector } from "react-redux";


function Cards(){
    const allProducts = useSelector(state => state.products)

    return(
        <div className="container d-flex justify-content-center h-100 align-items-center">
            <div className="row">
                {
                    allProducts.map(card => (
                        <div className="col-md-4" key={card.id}>
                            <Card nombre={card.nombre} URL={card.URL} marca={card.marca} precio={card.precio} color={card.color} talla={card.talla} categoria={card.categoria}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cards