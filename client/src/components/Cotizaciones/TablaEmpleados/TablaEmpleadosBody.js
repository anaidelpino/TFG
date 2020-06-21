import React from 'react';

import TablaEmpleadosRow from "./TablaEmpleadosRow";

class TablaEmpleadosBody extends React.Component {

    state = {
        ready: false,
        emLengthKey: null
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
            emLengthKey
        } = JSON.parse(JSON.stringify(this.state));



        if (!emLengthKey) {
            emLengthKey = instance.methods.misEmpleadosLength.cacheCall();
            changed = true;
        }

        if (changed) {
            this.setState({
                emLengthKey

            });
        }
    }

    render() {
        const {drizzle, drizzleState} = this.props;
        const instanceState = drizzleState.contracts.Cotizaciones;

        if (!this.state.ready) {
            return <tbody></tbody>;
        }

        let el = instanceState.misEmpleadosLength[this.state.emLengthKey];
        el = el ? el.value : 0;

        let rows = [];
        for (let i = 0; i < el; i++) {

            rows[i] = (
                < TablaEmpleadosRow 
                    key={"EmpRow-"+i}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    empleadoIndex={i}
                />
            );
        }

        return (
            <tbody>{rows}</tbody>
        );
    }
}

export default TablaEmpleadosBody;