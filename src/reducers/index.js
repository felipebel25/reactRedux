import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducer';
import publicacionesReducer from "./publicacionsReducer";
import tareasReducer from "./tareasReducer"

export default combineReducers({    
        usuariosReducer,
        publicacionesReducer,
        tareasReducer
    
})