import React from 'react';

import { newContextComponents } from "drizzle-react-components";

const { ContractData } = newContextComponents;


export default (props) => (

    <header className="App">
        <h1>
            Bienvenido
        </h1>
        <h3>
        <p>
        La Tesorería General de la Seguridad Social, en su afán de acercar la Administración a los ciudadanos, va a implantar un nuevo 
        sistema de comunicación a los trabajadores y empresas. Para poder acceder al servicio es necesario que los datos con los que 
        accede a este sistema coincidan exactamente con los registrados en la Base de Datos de la Seguridad Social. 
        Si usted no ha realizado el registro previo deberá realizarlo en una Oficina de Registro para acreditar su identidad. 
        </p>
        </h3>
    </header>
);
