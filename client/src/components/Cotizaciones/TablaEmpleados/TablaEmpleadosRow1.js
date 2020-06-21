import React from 'react';

import {newContextComponents, ContractForm} from "drizzle-react-components";

const {ContractData} = newContextComponents;

export default (props) => {

    const {drizzle, drizzleState, empleadoAddr} = props;
    
    return (
        <tr key={"Emp"}>

            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract={"Usuarios"}
                method={"usuario"}
                methodArgs={[empleadoAddr]}
                render={user => (
                    <>
                        <td>{user.nombre}</td>
                        <td>{user.apellidos}</td>
                        <td>{user.telefono}</td>
                        <td>{user.DNI}</td>
                        <td>{user.email}</td>
                    </>

                )}
            />
        </tr>
    );
}