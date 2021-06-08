import {TRAER_POR_USUARIO ,CARGANDO ,ERROR,COM_CARGANDO,COM_ERROR} from '../types/publicacionesTypes'

const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: '',
    com_cargando: false,
    com_error: "",
};

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
            case TRAER_POR_USUARIO:
                return{
                    ...state,
                    publicaciones: action.payload,
                    cargando: false,
                    error: "",
                  
                }
                case CARGANDO: 
                    return{...state, cargando: true};   
                
                case ERROR: 
                    return{...state, 
                        error: action.payload, cargando: false}; 
                case TRAER_POR_USUARIO:
                    return{
                        ...state,
                        publicaciones: action.payload,
                        com_cargando: false,
                        com_error: "",
                        
                    }        
                case COM_CARGANDO: 
                        return{...state, cargando: true};   
                    
                case COM_ERROR: 
                    return{...state, 
                        error: action.payload, cargando: false}; 
                    
            default:
                return state;
        
        
    }
}