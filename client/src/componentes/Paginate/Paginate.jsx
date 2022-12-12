import React from 'react'
import style from './Paginate.module.css'

const Paginate = (props) => {
    
    const items = props.items.map((item,index) => {
        return <li key={item.id}>{item.title}</li>
    })
    
    return (
        <div>
            <button onClick={props.prevHandler}>Prev</button>
            <h2>{props.currentPage}</h2>
            <button onClick={props.nextHandler}>Next</button>

            <ul>
                {items}
            </ul>
        </div>
    )
}

export default Paginate;
