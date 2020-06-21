import React from 'react';

import NumeroCotizacionesEm from "./NumeroCotizacionesEm";

class DireccionEmpresa extends React.Component {

    state = {
        ready: false,
        empresaKey: null
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState, empresaIndex} = this.props;
    
        const instanceState = drizzleState.contracts.Cotizaciones;
        if (!instanceState || !instanceState.initialized) return;

        const instance = drizzle.contracts.Cotizaciones;

        let changed = false;

        // Copiar el estado
        let {
            empresaKey
        } = JSON.parse(JSON.stringify(this.state));
        
        if (!empresaKey) {
            empresaKey = instance.methods.empresas.cacheCall(drizzleState.accounts[0],empresaIndex);

            changed = true;           
        }

        if (changed) {
            this.setState({
                empresaKey

            });
        }      
    }

    render() {
        const {drizzle, drizzleState, empresaIndex} = this.props;
        const instanceState = drizzleState.contracts.Cotizaciones;

        if (!this.state.ready|| !instanceState || !instanceState.initialized) {
            return "";
        }

        let addEmpl = instanceState.empresas[this.state.empresaKey];
                
        let rows = null;                            
                
         if(addEmpl){
            rows = (
                < NumeroCotizacionesEm 
                    key={"DirEmpr"}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    empresaIndex={empresaIndex}
                    empresaAddr={addEmpl.value}
                />
            );
        }
        
         return (
            <>{rows}</>
        );
    }
}

export default DireccionEmpresa;