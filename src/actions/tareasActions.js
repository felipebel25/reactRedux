import axios from 'axios'

import {TRAER_TODAS,CAMBIO_USUARIO_ID ,CAMBIO_TITULO, CARGANDO , ERROR, AGREGADA, ACTUALIZAR, LIMPIAR} from '../types/tareaTypes'

const API = "https://jsonplaceholder.typicode.com/todos"

export const traerTodas = () => async (dispatch) =>{
     dispatch({
          type: CARGANDO,
     })
 try {
     const respuesta = await axios.get(API);
     const tareas = {};
     respuesta.data.map((tar)=>(
          tareas[tar.userId]= {
               ...tareas[tar.userId],
               [tar.id]:{
                    ...tar
               }
          }

     ));
          
     dispatch({
          type: TRAER_TODAS,
          payload: tareas,
          
     })
 } catch (error) {
      dispatch({
           type: ERROR,
           payload: error.message
      })
      
 }
}

export const cambioUsuarioId =(usuario_id) => (dispatch) =>{
     dispatch({
          type: CAMBIO_USUARIO_ID,
          payload: usuario_id
     })
}
export const cambioTitulo =(titulo) => (dispatch) =>{
     dispatch({
          type: CAMBIO_TITULO,
          payload: titulo
     })
}
export const agregar = ( nueva_tarea) => async(dispatch)=>
{
     dispatch({
          type: CARGANDO,

     })

     try {
          const response = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea)
          console.log(response.data);
          dispatch({
               type: AGREGADA,
          })
     } catch (error) {
          dispatch({
               type: ERROR,
               payload: "no encontre nada"
          })
     }
}
export const editar = ( tarea_editada) => async(dispatch)=>
{
     dispatch({
          type: CARGANDO,

     })

     try {
          const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada)
          console.log(response.data);
          dispatch({
               type: AGREGADA,
          })
     } catch (error) {
          dispatch({
               type: ERROR,
               payload: "no encontre nada"
          })
     }
   
}
export const cambioCheck = (usu_id, tar_id) =>async(dispatch,getState)=>{
     const {tareas}= getState().tareasReducer;
     const seleccionada = tareas[usu_id][tar_id]
     const actualizadas= {
          ...tareas
     }
     actualizadas[usu_id]= {
          ...tareas[usu_id]
     }
     actualizadas[usu_id][tar_id] = {
          ...tareas[usu_id][tar_id],
          completed: !seleccionada.completed
     }
     dispatch({
          type: ACTUALIZAR,
          payload: actualizadas
     })
}
export const eliminar = (tar_id)=> async(dispatch) =>{
     dispatch({
          type: CARGANDO
     })
     try {
          const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`)

          console.log(respuesta);
          dispatch({
               type: TRAER_TODAS,
               payload: {}
          })
          
     } catch (error) {
          console.log(error);
     }
}
export const limpiarForma = () => (dispatch) =>{
     dispatch({
          type: LIMPIAR
     })
}