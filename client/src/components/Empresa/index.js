import React from 'react';
import EmpresasHead from "./EmpresasHead";
import EmpresasBody from "./EmpresasBody";
import EmpresasRow from "./EmpresasRow";
import NewCompany from "./NewCompany";
import {newContextComponents} from 'drizzle-react-components';


const {ContractForm} = newContextComponents;

class Empresa extends React.Component {

    state = {
        ready: false,
        empresasLengthKey: null,
        administradorKey: null,
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    //prevProps es this.props y prevState es this.state
    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Empresas;
        if (!instanceState || !instanceState.initialized) return;

        const instance = drizzle.contracts.Empresas;

        let changed = false;


        // Copiar el estado
        let {
            empresasLengthKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!empresasLengthKey) {
            empresasLengthKey = instance.methods.empresasLength.cacheCall();

            changed = true;
        }


        // Copiar el estado
        let {
            administradorKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!administradorKey) {
            administradorKey = instance.methods.administracion.cacheCall();

            changed = true;
        }

        if (changed) {
            this.setState({
                administradorKey,
                empresasLengthKey

            });
        }
        
    }


    render() {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Empresas;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        let el = instanceState.empresasLength[this.state.empresasLengthKey];
        el = el ? el.value : "??";
        let administradorAddress = instanceState.administracion[this.state.administradorKey];
        administradorAddress = administradorAddress ? administradorAddress.value : "??";

        if(administradorAddress == drizzleState.accounts[0]){
            return (
                <section>
                    <h2>Empresas registradas en el sistema </h2>
                    <table>
                        <EmpresasHead/>   
                        <EmpresasBody drizzle={drizzle}
                                 drizzleState={drizzleState}
                                 empresasLength={el}/>     
                    </table>
                    <NewCompany drizzle={drizzle} drizzleState={drizzleState} administradorAdd={administradorAddress} empresasLength={el} />
                </section>
            );
        }
        else{
            return (
                <section>
                    <NewCompany drizzle={drizzle} drizzleState={drizzleState} administradorAdd={administradorAddress} empresasLength={el} />
                </section>
            );
        }
    }
}

export default Empresa;