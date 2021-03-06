import axios from 'axios';
import {
	CARGANDO,
	ERROR,
	TRAER_POR_USUARIO,
	COM_CARGANDO,
	COM_ERROR
} from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/actionTypes';

const { traerTodo: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {
	dispatch({
		type: CARGANDO
	});

	let { usuarios } = getState().usuariosReducer;
	const { publicaciones } = getState().publicacionesReducer;
	const usuario_id = usuarios[key].id;

	try {
		const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);


		const nuevas = respuesta.data.map((publicacion)=>({
			...publicacion,
			comentarios: [],
			abierto: false

				
		}));
		const publicaciones_actualizadas = [
			...publicaciones,
			nuevas
		];

		dispatch({
			type: TRAER_POR_USUARIO,
			payload: publicaciones_actualizadas
		});

		const publicaciones_key = publicaciones_actualizadas.length - 1;
		const usuarios_actualizados = [...usuarios];
		usuarios_actualizados[key] = {
			...usuarios[key],
			publicaciones_key
		};

		dispatch({
			type: USUARIOS_TRAER_TODOS,
			payload: usuarios_actualizados
		});
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Publicaciones no disponibles.'
		});
	}
};

export const abrirCerrar = (pub_key, com_key) => (dispatch , getState) =>{
	const { publicaciones } = getState().publicacionesReducer;
	
	const seleccionada = publicaciones[pub_key][com_key];

	const actualizada = {
		...seleccionada,
		abierto: !seleccionada.abierto
		
	}
	const publicaciones_actualizadas = [ ...publicaciones];

	publicaciones_actualizadas[pub_key][com_key] =actualizada;


	dispatch({
		type: TRAER_POR_USUARIO,
		payload: publicaciones_actualizadas
	})



}

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) =>{
	try {
		dispatch({
			type: COM_CARGANDO,
			payload: true
		})

	const { publicaciones } = getState().publicacionesReducer;
	const seleccionada = publicaciones[pub_key][com_key];
	const response =  await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

	const actualizada = {
		...seleccionada,
		comentarios: response.data
		
	}
	const publicaciones_actualizadas = [ ...publicaciones];

	publicaciones_actualizadas[pub_key] = [
		...publicaciones[pub_key]
	]
	publicaciones_actualizadas[pub_key][com_key] =actualizada;
	dispatch({
		type: TRAER_POR_USUARIO,
		payload: publicaciones_actualizadas
	})
	
	
	} catch (error) {
		dispatch({
			type:COM_ERROR,
			payload: "comentarios no found xd"
		})
	}
}

