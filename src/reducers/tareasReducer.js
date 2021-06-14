import {TRAER_TODAS, CARGANDO, ERROR, CAMBIO_USUARIO_ID, CAMBIO_TITULO, AGREGADA, ACTUALIZAR, LIMPIAR} from '../types/tareaTypes'

const INITIAL_STATE = {
    tareas: {},
    cargando: true,
    error: "",
    usuario_id: "",
    titulo: "",
    regresar: false,
};

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case TRAER_TODAS:
            return{...state, 
                tareas: action.payload,
                cargando: false,
                error: "",
                regresar: false

            }
            
        case CARGANDO: 
            return{...state, cargando: true};   
            
        case ERROR: 
            return{...state, error: action.payload, cargando: false}; 
        
        case CAMBIO_USUARIO_ID:
            return{
                ...state, 
                usuario_id: action.payload
            }
        case CAMBIO_TITULO:
            return{
                ...state, 
                titulo : action.payload
            }
        case AGREGADA:
            return{ 
                ...state,
                tareas:{},
                cargando: false,
                error: "",
                regresar:  true
        }
        case ACTUALIZAR:
            return{
                ...state,
                tareas: action.payload
            }
        case LIMPIAR:
            return{
                ...state,
                usuario_id: "",
                titulo: "",
            
            }
            default:
                return state;
        
        
    }
}