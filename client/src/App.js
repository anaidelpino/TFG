import React from 'react';

import { DrizzleContext } from "drizzle-react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './Header';
import Usuario from "./components/Usuario"; 
import Empresa from "./components/Empresa"; 
import Cotizaciones from "./components/Cotizaciones"; 

//import NavigationUser from "./components/NavigationUser"; 


const Navegacion = () => (
   // <div className={"site-content"}>
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/usuario/">Usuario</Link></li>
            <li><Link to="/empresa/">Empresa</Link></li>
            <li><Link to="/cotizaciones/">Cotizaciones</Link></li>
        </ul>
    </nav>
      //</div>
   
);

export default () => (
//Se usa DrizzleContext para no tener que pasar explícitamente las propiedades drizzle y drizzleState por
//toda la jerarquía de componentes desde el componente raíz hasta llegar a los subcomponentes
    <DrizzleContext.Consumer>
        {drizzleContext => {
            const {drizzle, drizzleState, initialized} = drizzleContext;

            if (!initialized) {
                return (
                    <main><h1><span role="img">⚙</span>️ Cargando dapp...</h1></main>
                );
            }

            return (
                
                    <Router>
                        <Navegacion/>

                        <Route path="/">
                        <Header drizzle={drizzle}
                                drizzleState={drizzleState}/>
                        </Route>
                        
                        <Route path="/usuario/">
                            <Usuario drizzle={drizzle}
                                            drizzleState={drizzleState}/>
                        </Route>
                        <Route path="/empresa/">
                            <Empresa drizzle={drizzle}
                                            drizzleState={drizzleState}/>
                        </Route>
                        <Route path="/cotizaciones/">
                            <Cotizaciones drizzle={drizzle}
                                            drizzleState={drizzleState}/>
                        </Route>

                    </Router>


                
            )
        }}
    </DrizzleContext.Consumer>
);
