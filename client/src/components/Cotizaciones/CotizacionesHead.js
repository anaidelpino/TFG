import React from 'react';

export default (props) => {
    const {empleados} = props;

 if(empleados == 0){
    return (
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Teléfono</th>
                <th>DNI</th>
                <th>Email</th>
                <th>Cantidad (Euros)</th>
                <th>Mes</th>
                <th>Año</th>
            </tr>
        </thead>
    );
}else{
    return(
        <thead>
            <tr>
                <th>Empresa</th>
                <th>CIF</th>
                <th>Cantidad (Euros)</th>
                <th>Mes</th>
                <th>Año</th>
            </tr>
        </thead>
        )
}
};

