export const GET_PRODUCTS = 'GET_PRODUCTS';
import Productos from '../../info/info.js'

const result = Productos

export const getProducts = () => { 
    return{ type: GET_PRODUCTS ,
            payload: result 
        }
};