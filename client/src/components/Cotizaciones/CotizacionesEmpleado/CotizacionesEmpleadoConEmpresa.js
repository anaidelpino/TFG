import React from 'react';

import {newContextComponents, ContractForm} from "drizzle-react-components";

const {ContractData} = newContextComponents;

export default (props) => {

    const {drizzle, drizzleState, cotizacionIndex, empresaAddr} = props;

    
    return (
        <tr key={"Cotización-" + cotizacionIndex}>

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
                        <ContractData
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            contract={"Cotizaciones"}
                            method={"cotizaciones"}
                            methodArgs={[drizzleState.accounts[0], empresaAddr, cotizacionIndex]}
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