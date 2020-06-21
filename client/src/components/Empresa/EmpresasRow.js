import React from 'react';

import {newContextComponents} from "drizzle-react-components";

const {ContractData} = newContextComponents;

export default (props) => {

    const {drizzle, drizzleState, empresaIndex, empresaAddr} = props;

    return (
        <tr key={"Empresa-" + empresaIndex}>

            <td>{empresaAddr}</td>

            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract={"Empresas"}
                method={"empresa"}
                methodArgs={[empresaAddr]}
                render={company => (
                    <>
                        <td>{company.nombre}</td>
                        <td>{company.CIF}</td>
                        <td>{company.telefono}</td>
                        <td>{company.email}</td>
                    </>

                )}
            />
        </tr>
    );
}