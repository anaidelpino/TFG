import React from 'react';
import UsuariosRow from "./UsuariosRow";

class UsuariosBody extends React.Component {
    state = {
        ready: false,
        usuarioAddrsKeys: []
    }
    componentDidMount() {
        this.setState({ready: true});
    }
    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;
        const instance = drizzle.contracts.Usuarios;

        let changed = false;
        let { usuarioAddrsKeys } = JSON.parse(JSON.stringify(this.state));

        // Añadir keys de las nuevas matriculas
        for (let i = usuarioAddrsKeys.length; i < this.props.usuariosLength; i++) {
            usuarioAddrsKeys[i] = instance.methods.usuarios.cacheCall(i);
            changed = true;
        }
        if (changed) {
            this.setState({
                usuarioAddrsKeys
            });
        }
    }
    render() {
        const {drizzle, drizzleState} = this.props;
        const instanceState = drizzleState.contracts.Usuarios;

        if (!this.state.ready) {
            return <tbody></tbody>;
        }
        let ul = this.props.usuariosLength;
        let rows = [];
        for (let i = 0; i < ul; i++) {
            let addr = instanceState.usuarios[this.state.usuarioAddrsKeys[i]];
            addr = addr ? addr.value : "";
            rows[i] = (
                < UsuariosRow
                    key={"USER-" + i}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    usuarioIndex={i}
                    usuarioAddr={addr}
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
export default UsuariosBody;