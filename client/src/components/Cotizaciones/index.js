import React from 'react';


import NuevaCotizacion from "./NuevaCotizacion";
import Contrataciones from "./Contrataciones";
import CotizacionesHead from "./CotizacionesHead";
import NumeroEmpleados from "./NumeroEmpleados";
import TablaEmpleadosHead from "./TablaEmpleados/TablaEmpleadosHead";
import TablaEmpleadosBody from "./TablaEmpleados/TablaEmpleadosBody";
import {newContextComponents} from 'drizzle-react-components';


const {ContractForm} = newContextComponents;

class Cotizaciones extends React.Component {

    state = {
        ready: false,
        cotizacionesLengthKey: null,
        empleadosKey: null,
        administradorKey: null
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    //prevProps es this.props y prevState es this.state
    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Cotizaciones;
        if (!instanceState || !instanceState.initialized) return;

        const instance = drizzle.contracts.Cotizaciones;

        
        let changed = false;

        // Copiar el estado
        let {
            cotizacionesLengthKey
        } = JSON.parse(JSON.stringify(this.state));         

        if (!cotizacionesLengthKey) {
            cotizacionesLengthKey = instance.methods.cotizacionesLength.cacheCall();

            changed = true;
        }

        let {
            empleadosKey
        } = JSON.parse(JSON.stringify(this.state));

         if (!empleadosKey) {
            empleadosKey = instance.methods.empleado.cacheCall();
            changed = true;
        }
        let {
            administradorKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!administradorKey) {
            administradorKey = instance.methods.administracion.cacheCall();

            changed = true;
        }

        if (changed) {

            this.setState({
                cotizacionesLengthKey,
                empleadosKey,
                administradorKey

            });
        }
        
    }


    render() {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Cotizaciones;
        if (!this.state.ready || !instanceState || !instanceState.initialized ) {
            return <span>Initializing...</span>;
        }

        let cl = instanceState.cotizacionesLength[this.state.cotizacionesLengthKey];
        cl = cl ? cl.value : "??";

        let el = instanceState.empleado[this.state.empleadosKey];
        el = el ? el.value : "??";
        
        let administradorAddress = instanceState.administracion[this.state.administradorKey];
        administradorAddress = administradorAddress ? administradorAddress.value : "??";

        return (
        <section>
                <h2>Cotizaciones</h2>
                <table>
                    <CotizacionesHead empleados={el}/>      
                    <NumeroEmpleados drizzle={drizzle} 
                                  drizzleState={drizzleState} empleados={el}/>
                
                </table>
                <NuevaCotizacion drizzle={drizzle} drizzleState={drizzleState} cotizacionesLength={cl} empleados={el}/>
                
                <br/>
                <table>
                    <TablaEmpleadosHead empleados={el}/>      
                    <TablaEmpleadosBody drizzle={drizzle} 
                                  drizzleState={drizzleState} empleados={el}/>
                
                </table>
                <br/>
                <Contrataciones drizzle={drizzle} drizzleState={drizzleState} empleados={el} administradorAdd={administradorAddress}/>

        </section>
        );
    
    }
}

export default Cotizaciones;