import React from 'react';

import TablaEmpleadosRow1 from "./TablaEmpleadosRow1";

class TablaEmpleadosRow extends React.Component {

    state = {
        ready: false,
        emKey: null
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
            emKey
        } = JSON.parse(JSON.stringify(this.state));
        
        if (!emKey) {
            emKey = instance.methods.empleados.cacheCall(drizzleState.accounts[0],empleadoIndex);

            changed = true;           
        }

        if (changed) {
            this.setState({
                emKey

            });
        }

        
    }

    render() {
        const {drizzle, drizzleState, empleadoIndex} = this.props;
        const instanceState = drizzleState.contracts.Cotizaciones;

        if (!this.state.ready|| !instanceState || !instanceState.initialized) {
            return "";
        }

        let addEmp = instanceState.empleados[this.state.emKey];
        
        let rows = null;                            
        
            if(addEmp){
            rows = (
                < TablaEmpleadosRow1 
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

export default TablaEmpleadosRow;