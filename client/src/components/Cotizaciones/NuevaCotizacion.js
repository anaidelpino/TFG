import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";

const { AccountData, ContractData, ContractForm } = newContextComponents;

class NuevaCotizacion extends React.Component {

    state = {
        ready: false,
        cotizacionKeys: []
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;

        const instance = drizzle.contracts.Cotizaciones;

        let changed = false;

        // Copiar el estado
        let { cotizacionKeys } = JSON.parse(JSON.stringify(this.state));

        // Añadir keys de las nuevas matriculas
        for (let i = cotizacionKeys.length; i < this.props.cotizacionesLength; i++) {
            cotizacionKeys[i] = instance.methods.todasCotizaciones.cacheCall(i);
            changed = true;
        }

        if (changed) {
            this.setState({
                cotizacionKeys
            });
        }

    }

    render() {
        const {drizzle, drizzleState, empleados, cotizacionesLength} = this.props;
        const instanceState = drizzleState.contracts.Cotizaciones;

        if (!this.state.ready) {
            return <tbody></tbody>;
        }

        const Cotizaciones =[];
            for (let i = 0; i < cotizacionesLength; i++) {
                let cot = instanceState.todasCotizaciones[this.state.cotizacionKeys[i]];
                cot = cot ? cot.value : "";
                if(cot!==""){
                    Cotizaciones.push(cot);
                }
            }

        if(empleados == 0){
            return (
                <section>
                    <br/>
                    <h2>Añadir nueva cotización</h2>
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract={"Cotizaciones"}
                        method={"creaCotizacion"}
                        labels={['Usuario','Empresa','Cantidad', 'Mes', 'Año']}             
                    />
        
                </section>
            );
        }else{
            return(
                <section></section>
            )
        }
    }
}


export default NuevaCotizacion;