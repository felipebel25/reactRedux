import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import Error from "../Error";
import { Redirect, useParams } from "react-router-dom";
import * as tareasActions from "../../actions/tareasActions";
class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { usu_id, tar_id },
      },
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma,
    } = this.props;
    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForma();
    }
  }
  cambioUsuarioId = (event) => {
    let evento = event.target.value;
    this.props.cambioUsuarioId(evento);
  };
  cambioTitulo = (event) => {
    let eventTitulo = event.target.value;

    this.props.cambioTitulo(eventTitulo);
  };
  guardar = () => {
    const {
      usuario_id,
      titulo,
      agregar,
      match: {
        params: { usu_id, tar_id },
      },
      tareas,
      editar,
    } = this.props;
    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    };
    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: false,
        id: tarea.id,
      };
      editar(tarea_editada);
    } else {
      agregar(nueva_tarea);
    }
  };
  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;
    if (cargando) {
      return true;
    }
    if (!usuario_id || !titulo) {
      return true;
    }
    return false;
  };
  mostrarAcciones = () => {
    const { cargando, error } = this.props;
    if (cargando) {
      return <Spinner />;
    }
    if (error) {
      return <Error error={error} />;
    }
  };
  render() {
    return (
      <div>
        {this.props.regresar && <Redirect to="/Tareas/Tareas"></Redirect>}
        <h1>Llego a la disco vestido de jordan </h1>
        Usuario id:
        <input
          placeholder="hola"
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambioUsuarioId}
        />
        <br />
        <br />
        Titulo:
        <input
          type="text"
          value={this.props.titulo}
          onChange={this.cambioTitulo}
        />
        <br />
        <br />
        <button
          type="button"
          disabled={this.deshabilitar()}
          onClick={this.guardar}
        >
          Guardar
        </button>
        {this.mostrarAcciones()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;
export default connect(mapStateToProps, tareasActions)(Guardar);
