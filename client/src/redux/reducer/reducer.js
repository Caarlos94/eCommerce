// Importa las action types acá
import { GET_PRODUCTS } from '../actions/actions.js'


const initialState = {
productos:[]
};


const rootReducer = (state = initialState, action) => {

switch (action.type) {

case GET_PRODUCTS:{
    console.log(action.payload);
return{
 ...state,
  productos : [...action.payload]
}
}


}
return{...state};
};

export default rootReducer;
