import axios from 'axios'

import {traerTodo,  CARGANDO , ERROR} from '../types/actionTypes'

const API = "https://jsonplaceholder.typicode.com/users"

export const traerTodos = () => async (dispatch) =>{
     dispatch({
          type: CARGANDO,
     })
 try {
     const respuesta = await axios.get(API)
          
     dispatch({
          type: traerTodo,
          payload: respuesta.data,
          
     })
 } catch (error) {
      dispatch({
           type: ERROR,
           payload: error.message
      })
      
 }
}