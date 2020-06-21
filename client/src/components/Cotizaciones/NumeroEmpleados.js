import React from 'react';

import DireccionEmpleado from "./CotizacionesEmpresa/DireccionEmpleado";
import DireccionEmpresa from "./CotizacionesEmpleado/DireccionEmpresa";

class NumeroEmpleados extends React.Component {

    state = {
        ready: false,
        empleadosLengthKey: null,
        empresasLengthKey: null
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Cotizaciones;
        
        if (!instanceState || !instanceState.initialized) return;
       
        const instance = drizzle.contracts.Cotizaciones;

        let changed = false;

        // Copiar el estado
        let {
            empleadosLengthKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!empleadosLengthKey) {
            empleadosLengthKey = instance.methods.misEmpleadosLength.cacheCall();
            changed = true;
        }
        let {
            empresasLengthKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!empresasLengthKey) {
            empresasLengthKey = instance.methods.misEmpresasLength.cacheCall();
            changed = true;
        }

        if (changed) {
            this.setState({
                empleadosLengthKey,
                empresasLengthKey

            });
        }
    }

    render() {
        const {drizzle, drizzleState, empleados} = this.props;

        const instanceState = drizzleState.contracts.Cotizaciones;

        if (!this.state.ready) {
            return <tbody></tbody>;
        }

 
        let el = instanceState.misEmpleadosLength[this.state.empleadosLengthKey];
        el = el ? el.value : 0;

        let eml = instanceState.misEmpresasLength[this.state.empresasLengthKey];
        eml = eml ? eml.value : 0;
        let rows = [];
        if(empleados == 0){
            for (let i = 0; i < el; i++) {                
                rows[i] = (
                
                    < DireccionEmpleado 
                        key={"EmpRow-"+i}
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        empleadoIndex={i}
                    />
                    
                );
                
            }
        }else{
            for (let i = 0; i < eml; i++) {

                rows[i] = (
                    < DireccionEmpresa 
                        key={"EmpRow-"+i}
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        empresaIndex={i}
                    />
                );
            }
        }
        return (
            <tbody>{rows}</tbody>
        );
    }
    
}

export default NumeroEmpleados;