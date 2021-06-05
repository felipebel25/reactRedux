import React from 'react'
import {Link} from 'react-router-dom'


const Header = (props) =>{
    return(
        <nav id="menu">
             <Link to="/information"><h1>Information</h1></Link>
             <Link to="/"><h1>Home</h1></Link>
             <Link to="/tareas"><h1>Tareas</h1></Link>   

        </nav>
    )


}


export default Header;