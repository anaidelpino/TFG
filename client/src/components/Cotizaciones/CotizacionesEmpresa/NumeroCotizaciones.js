import React from 'react';

import CotizacionesEmpleado from "./CotizacionesEmpleado";

class NumeroCotizaciones extends React.Component {

    state = {
        ready: false,
        cotiLengthKey: null
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState, empleadoAddr} = this.props;

        const instanceState = drizzleState.contracts.Cotizaciones;
        
        if (!instanceState || !instanceState.initialized) return;
       
        const instance = drizzle.contracts.Cotizaciones;

        let changed = false;

        // Copiar el estado
        let {
            cotiLengthKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!cotiLengthKey) {
            cotiLengthKey = instance.methods.numeroCotizacionesEmpresa.cacheCall(empleadoAddr);
            changed = true;
        }
        
        if (changed) {
            this.setState({
                cotiLengthKey

            });
        }
    }

    render() {
        const {drizzle, drizzleState, empleadoAddr} = this.props;
        const instanceState = drizzleState.contracts.Cotizaciones;

        if (!this.state.ready) {
            return "";
        }


        let cl = instanceState.numeroCotizacionesEmpresa[this.state.cotiLengthKey];
        cl = cl ? cl.value : "??";

        let rows = [];
        for (let i = 0; i < cl; i++) {

            rows[i] = (
                < CotizacionesEmpleado 
                    key={"CotRow-"+i}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    empleadoAddr={empleadoAddr}
                    cotizacionIndex={i}
                />
            );
        }

        return (
            <>{rows}</>
        );
    }
}

export default NumeroCotizaciones;