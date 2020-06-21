import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";
import {Container, Form} from 'reactstrap';

const { AccountData, ContractData, ContractForm } = newContextComponents;

class NewCompany extends React.Component {

    state = {
        ready: false,
        empresaAddrsKeys: []
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;
        const instance = drizzle.contracts.Empresas;

        let changed = false;

        // Copiar el estado
        let { empresaAddrsKeys } = JSON.parse(JSON.stringify(this.state));

        // Añadir keys de las nuevas matriculas
        for (let i = empresaAddrsKeys.length; i < this.props.empresasLength; i++) {
            empresaAddrsKeys[i] = instance.methods.empresas.cacheCall(i);
            changed = true;
        }

        if (changed) {
            this.setState({
                empresaAddrsKeys
            });
        }
    }

    render() {
        const {drizzle, drizzleState, administradorAdd, empresasLength} = this.props;
        const instanceState = drizzleState.contracts.Empresas;

        if (!this.state.ready) {
            return <tbody></tbody>;
        }

        const EmpresasAddress =[];
        for (let i = 0; i < empresasLength; i++) {
            let addr = instanceState.empresas[this.state.empresaAddrsKeys[i]];
            addr = addr ? addr.value : "";
            if(addr!==""){
                EmpresasAddress.push(addr);
            }
        }

        var empresaExiste = false;
        for (let i = 0; i<EmpresasAddress.length; i++){
            if(drizzleState.accounts[0] == EmpresasAddress[i]){
                empresaExiste=true;
            }
        }


    if(empresaExiste){
        return(
            <section>
                <br/>
                <h5>Datos de la empresa:</h5>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="Empresas"
                    method="quienSoy"
                    render={company =>(
                        <>
                            <formulario>
                                <Form className="formulario">
                                    <h4><li> Empresa: <b>{company._nombre}</b></li></h4>
                                    <h4><li> CIF: <b>{company._CIF}</b></li></h4>
                                    <h4><li> Email: <b>{company._email}</b></li></h4>
                                    <h4><li> Teléfono: <b>{company._telefono}</b></li></h4>
                                </Form>
                            </formulario>
                        </>
                    )}
                />
            </section>
        )
    }
    else if(administradorAdd == drizzleState.accounts[0]){
        return (
            <section>
                <br/>
                <h2>Registrar una empresa</h2>
                <ContractForm
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract={"Empresas"}
                    method={"creaEmpresa"}
                    labels={['Address', 'Nombre', 'CIF', 'Teléfono', 'Email']}  
                />
            </section>
        );
    }
    else{
        return(
            <section>
                <br/>
                <h6>Usted no está registrado como empresa en el sistema</h6>
            </section>
        )
    }
}
}


export default NewCompany;