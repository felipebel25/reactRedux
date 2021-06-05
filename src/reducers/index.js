import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducer';
import publicacionesReducer from "./publicacionsReducer"

export default combineReducers({    
        usuariosReducer,
        publicacionesReducer
    
})