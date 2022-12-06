// Importa las action types acá
import {GET_PRODUCTS} from '../actions/actions.js'


const initialState = {
totalVideogames:[],
videogames: [],
videogamesid:{},
searchVideoGames:[],
data:''
};


const rootReducer = (state = initialState, action) => {

switch (action.type) {

case GET_PRODUCTS:{
return{
 ...state,
 data : 'hola'
}
}

// case GET_VIDEOGAME_ID:{
// return{
//  ...state,
//  videogamesid : action.payload
// }
// } 

// case GET_SEARCHVIDEOGAMES:{
// return{
//  ...state,
//  searchVideoGames : action.payload
// }
// }

// case LIMPIAR_STATE:{
// return{
//  ...state,
//  searchVideoGames: [],
//  videogamesid: {}
// }
// }

}
return{...state};
};

export default rootReducer;
