import React from 'react';

import NumeroCotizaciones from "./NumeroCotizaciones";

class DireccionEmpleado extends React.Component {

    state = {
        ready: false,
        empleadoKey: null
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState, empleadoIndex} = this.props;
    
        const instanceState = drizzleState.contracts.Cotizaciones;
        if (!instanceState || !instanceState.initialized) return;

        const instance = drizzle.contracts.Cotizaciones;

        let changed = false;

        // Copiar el estado
        let {
            empleadoKey
        } = JSON.parse(JSON.stringify(this.state));
        
        if (!empleadoKey) {
            empleadoKey = instance.methods.empleados.cacheCall(drizzleState.accounts[0],empleadoIndex);

            changed = true;           
        }

        if (changed) {
            this.setState({
                empleadoKey

            });
        }

        
    }

    render() {
        const {drizzle, drizzleState, empleadoIndex} = this.props;
        const instanceState = drizzleState.contracts.Cotizaciones;

        if (!this.state.ready|| !instanceState || !instanceState.initialized) {
            return "";
        }


        let addEmp = instanceState.empleados[this.state.empleadoKey];
        
        let rows = null;                            
        
        if(addEmp){
            rows = (
                < NumeroCotizaciones 
                    key={"DirEmpl"}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    empleadoIndex={empleadoIndex}
                    empleadoAddr={addEmp.value}
                />
            );
        }
         return (
            <>{rows}</>
        );
    }
}

export default DireccionEmpleado;