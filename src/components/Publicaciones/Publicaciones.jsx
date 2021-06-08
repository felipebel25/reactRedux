import React,{Component} from 'react'
import {connect } from 'react-redux';
import Spinner from '../Spinner';
import Comentarios from './Comentarios'
import Error from '../Error';

import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions.js'

const {traerTodos: usuariosTraerTodos } = usuariosActions;
const {traerPorUsuario: publicacionesTraerPorUsuario,
	 abrirCerrar,
	 traerComentarios} = publicacionesActions;


class Publicaciones  extends Component {

	async componentDidMount() {
		const {
			usuariosTraerTodos,
			match: { params: { key } },
			publicacionesTraerPorUsuario
		} = this.props;

		if (!this.props.usuariosReducer.usuarios.length) {
			await usuariosTraerTodos();
		}
		if (this.props.usuariosReducer.error) {
			return;
		}
		if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
			await publicacionesTraerPorUsuario(key);
		}
	}

	ponerUsuario = () => {
		const {
			match: { params: { key } },
			usuariosReducer
		} = this.props;

		if (usuariosReducer.error) {
			return <Error mensaje={ usuariosReducer.error } />;
		}
		if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
			return <Spinner />
		}

		const nombre = usuariosReducer.usuarios[key].name;

		return (
			<h1>
				Publicaciones de { nombre }
			</h1>
		);
	};

	ponerPublicaciones = () => {
		const {
			usuariosReducer,
			usuariosReducer: { usuarios },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: { params: { key } }
		} = this.props;

		if (!usuarios.length) return;
		if (usuariosReducer.error) return;
		if (publicacionesReducer.cargando) {
			return <Spinner />;
		}
		if (publicacionesReducer.error) {
			return <Error error={ publicacionesReducer.error } />
		}
		if (!publicaciones.length) return;
		if (!('publicaciones_key' in usuarios[key])) return;

		const { publicaciones_key } = usuarios[key];
		return this.mostrarInfo( 
			publicaciones[publicaciones_key], 
			publicaciones_key)
	};
	mostrarInfo = (publicaciones , pub_key) =>(
		publicaciones.map((publicacion, com_key) => (

			<main >

				<div
					key={publicacion.id}
					className='publicaciones--container__posts '
					onClick={()=> 
					this.mostrarComentario(pub_key, com_key, publicacion.comentarios)} >
				
				
					<h2>
						{ publicacion.title } hey
					</h2>
					<h3>
						{ publicacion.body }
					</h3>
					{
						(publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}></Comentarios>: "cerrado"
					}
				</div>

			</main>
		))

	)
	mostrarComentario = (pub_key, com_key, comentarios) =>{
		console.log('comentarios', comentarios)
		console.log(this.props);
		this.props.abrirCerrar(pub_key,com_key);
		if (!comentarios.lenght){
			this.props.traerComentarios(pub_key,com_key)	
		}
	}
	render() {
		return (
			<div className="publicaciones--container ">
				{ this.ponerUsuario() }
				{ this.ponerPublicaciones()}
			</div>
		);
	}
}

const mapStateToProps=({usuariosReducer, publicacionesReducer})=> {
    return{
        usuariosReducer,
        publicacionesReducer
    }
}
const mapDispatchToProps ={
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
	abrirCerrar,
	traerComentarios
}
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)
