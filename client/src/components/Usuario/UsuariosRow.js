import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

export default (props) => {

    const {drizzle, drizzleState, usuarioIndex, usuarioAddr} = props;

    return (
        <tr key={"USER-" + usuarioIndex}>

            <td>{usuarioAddr}</td>

            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract={"Usuarios"}
                method={"usuario"}
                methodArgs={[usuarioAddr]}
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