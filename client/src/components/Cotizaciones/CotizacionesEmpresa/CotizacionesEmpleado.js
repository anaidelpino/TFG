import React from 'react';

import {newContextComponents, ContractForm} from "drizzle-react-components";

const {ContractData} = newContextComponents;

export default (props) => {

    const {drizzle, drizzleState, cotizacionIndex, empleadoAddr} = props;

    
    return (
        <tr key={"Cotización-" + cotizacionIndex}>

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
                        <ContractData
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            contract={"Cotizaciones"}
                            method={"cotizaciones"}
                            methodArgs={[empleadoAddr, drizzleState.accounts[0], cotizacionIndex]}
                            render={cot => (
                                    <>
                                    <td>{cot.cantidad}</td>
                                    <td>{cot.mes}</td>
                                    <td>{cot.ano}</td>
                                    </>
                            )}
                        />
                    </>

                )}
            />
        </tr>
    );
}