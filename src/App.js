import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/header'
import Opp from './components/usuarios/index'
import Tareas from './components/Tareas'
import Publicaciones from './components/Publicaciones/Publicaciones'
import './assets/styles/index.css'
const App = (props) =>{
   

  return(
    <BrowserRouter>
        <Header />
      

          <div className="margen">

           <Route exact path="/tareas" component={Tareas}></Route>
           <Route exact path="/information" component={Opp}></Route>
           <Route exact path="/publicaciones/:key" component={Publicaciones}></Route>

          </div>
         
        



    </BrowserRouter>
  )

}

export default App;