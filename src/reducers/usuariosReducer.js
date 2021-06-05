import {traerTodo, CARGANDO, ERROR} from '../types/actionTypes'


const INITIAL_STATE = {
    usuarios: [],
    cargando: true,
    error: ``,
};

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case traerTodo:
            return{...state, 
                usuarios: action.payload,
                cargando: false,
                error: ""
            }
            
        case CARGANDO: 
            return{...state, cargando: true};   
            
        case ERROR: 
            return{...state, error: action.payload, cargando: false}; 
        
            default:
                return state;
        
        
    }
}