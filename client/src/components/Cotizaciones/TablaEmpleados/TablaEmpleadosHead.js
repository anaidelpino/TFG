import React from 'react';

export default (props) => {

    const {empleados} = props;
    if(empleados == 0){
        return (
            <thead>
                <h2>Registro de empleados</h2>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Teléfono</th>
                    <th>DNI</th>
                    <th>email</th>
                </tr>
            </thead>
        );
    }else{
        return(
            <thead></thead>
        );
    }
};
