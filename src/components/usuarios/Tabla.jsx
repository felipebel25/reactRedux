import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';

import '../../assets/styles/iconos/iconos.css'

const Tabla = (props) => {
    const ponerFilas= ()=>{
        return(
          <tbody>
            {props.usuarios.map((item, key) =>(
              <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.website}</td>
                  <td>
                    <Link to={`/publicaciones/${key}`}>
               <div className="eye-solid icon" />
                    
                    </Link>

                   </td>
    
              </tr> 
            ))}
          </tbody>
        )
      } 
    return (
        <>
    <table className="tabla">
      <thead>
        <tr >
          <th>Nombre</th>
          <th>Correo</th>
          <th>Enlace</th>
        </tr>
      </thead>
        {ponerFilas()}
    </table>
        </>
    )
}
const mapStateToProps = (reducers) =>{
    return reducers.usuariosReducer;
}
export default connect(mapStateToProps) (Tabla)
