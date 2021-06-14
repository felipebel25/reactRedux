import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as tareasActions from "../../actions/tareasActions";

import Spinner from "../Spinner";
import Error from "../Error";

class Tareas extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas();
    }
  }
  componentDidUpdate() {
    const { tareas, cargando, traerTodas } = this.props;
    if (!Object.keys(this.props.tareas).length && cargando) {
      this.props.traerTodas();
    }
  }
  mostrarContenido = () => {
    const { tareas } = this.props;
    return Object.keys(tareas).map((usu_id) => (
      <main key={usu_id}>
        <h2>Usuario {usu_id}</h2>
        <section className="contenedor_tareas">
          {this.ponerTareas(usu_id)}
        </section>
      </main>
    ));
  };
  ponerTareas = (usu_id) => {
    const { tareas, cambioCheck, eliminar } = this.props;
    const por_usuario = {
      ...tareas[usu_id],
    };
    return Object.keys(por_usuario).map((tar_id) => (
      <div>
        <input
          type="checkbox"
          defaultChecked={por_usuario[tar_id].completed}
          onChange={() => cambioCheck(usu_id, tar_id)}
        />
        {por_usuario[tar_id].title}
        <button className="m_left">
          <Link to={`/Tareas/guardar/${usu_id}/${tar_id}`}>editar</Link>
        </button>
        <button className="m_left" onClick={() => eliminar(tar_id)}>
          eliminar
        </button>
      </div>
    ));
  };
  render() {
    const { tareas, cargando, error } = this.props;

    return (
      <main>
        {cargando && <Spinner />}
        {error && <Error error={error}></Error>}

        <h1>Tareas DOOOOOOOLLLAAAARRRRESSS</h1>
        <button type="button">
          <Link to="/Tareas/guardar">Agregar</Link>
        </button>
        {this.mostrarContenido()}
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return state.tareasReducer;
};
const mapDispatchToProps = {
  tareasActions,
};
export default connect(mapStateToProps, tareasActions)(Tareas);
