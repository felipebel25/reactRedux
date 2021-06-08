import React from 'react'
import {connect} from 'react-redux';
import Spinner from '../Spinner';
import Error from '../Error'
const Comentarios = (props) => {
    
    const ponerComentarios = () => (
     props.comentarios.map((comentario)=>(
         <li>
            {(props.com_error && <Error error={props.com_error}></Error>)}
            { (props.com_cargando && !props.comentarios.length) && <Spinner /> }
        <b>
            <u>{comentario.email}</u>

        </b>
        <br />
        {comentario.body}
    </li>))
    );
    return (

        <ul >

            {ponerComentarios()}
        </ul>
    )
}
const mapStateToProps= ({publicacionesReducer}) => publicacionesReducer;

export default connect(mapStateToProps) (Comentarios)
