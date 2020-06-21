import React from 'react';
import EmpresasRow from "./EmpresasRow";
class EmpresasBody extends React.Component {
    state = {
        ready: false,
        empresaAddrsKeys: []
    }
    componentDidMount() {
        this.setState({ready: true});
    }
    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;
        const instance = drizzle.contracts.Empresas;

        let changed = false;
        let { empresaAddrsKeys } = JSON.parse(JSON.stringify(this.state));
        // Añadir keys de las nuevas matriculas
        for (let i = empresaAddrsKeys.length; i < this.props.empresasLength; i++) {
            empresaAddrsKeys[i] = instance.methods.empresas.cacheCall(i);
            changed = true;
        }
        if (changed) {
            this.setState({
                empresaAddrsKeys
            });
        }
    }
    render() {
        const {drizzle, drizzleState} = this.props;
        const instanceState = drizzleState.contracts.Empresas;

        if (!this.state.ready) {
            return <tbody></tbody>;
        }
        let el = this.props.empresasLength;
        let rows = [];
        for (let i = 0; i < el; i++) {
            let addr = instanceState.empresas[this.state.empresaAddrsKeys[i]];
            addr = addr ? addr.value : "";
            rows[i] = (
                < EmpresasRow
                    key={"Empresa-" + i}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    empresaIndex={i}
                    empresaAddr={addr}
                />
            );
        }
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
}
export default EmpresasBody;