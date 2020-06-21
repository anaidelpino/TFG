import React from 'react';

import CotizacionesEmpleadoConEmpresa from "./CotizacionesEmpleadoConEmpresa";

class NumeroCotizacionesEm extends React.Component {

    state = {
        ready: false,
        cotiLengthKey: null
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState, empresaAddr} = this.props;
        const instanceState = drizzleState.contracts.Cotizaciones;
        
        if (!instanceState || !instanceState.initialized) return;
       
        const instance = drizzle.contracts.Cotizaciones;

        let changed = false;

        // Copiar el estado
        let {
            cotiLengthKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!cotiLengthKey) {
            cotiLengthKey = instance.methods.numeroCotizacionesUsuario.cacheCall(empresaAddr);
            changed = true;
        }
        

        if (changed) {
            this.setState({
                cotiLengthKey

            });
        }
    }

    render() {
        const {drizzle, drizzleState, empresaAddr} = this.props;

        const instanceState = drizzleState.contracts.Cotizaciones;

        if (!this.state.ready) {
            return "";
        }


        let cl = instanceState.numeroCotizacionesUsuario[this.state.cotiLengthKey];
        cl = cl ? cl.value : 0;

        let rows = [];
        
        for (let i = 0; i < cl; i++) {

            rows[i] = (
                < CotizacionesEmpleadoConEmpresa 
                    key={"CotRow-"+i}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    empresaAddr={empresaAddr}
                    cotizacionIndex={i}
                />
            );
        }

        return (
            <>{rows}</>
        );
    }
}

export default NumeroCotizacionesEm;