import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import '../../assets/styles/index.css'
import * as usuariosActions from '../../actions/usuariosActions'
import Spinner from '../Spinner'
import Error from '../Error'
import Tabla from './Tabla'


const Opp = (props) =>{
 
  const getData = () =>{
    {!props.usuarios.length && props.traerTodos(); }
  }

  const loading = props.cargando;
  const error =  props.error;
  console.log(error);
  useEffect(() => {
    getData();
  }, [])



  return (
    <div id="margen">
      <h1>Usuarios</h1>
      {error && <Error error={error}/>}
      {loading && <Spinner />}
    {!loading && error === "" && 
      <Tabla />
   
    }


  </div>
  )
}
const mapStateToProps = (state) =>{
  return state.usuariosReducer;

}

export default connect(mapStateToProps, usuariosActions) (Opp);
