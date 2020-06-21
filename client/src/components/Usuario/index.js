import React from 'react';
import UsuariosHead from "./UsuariosHead";
import UsuariosBody from "./UsuariosBody";
import UsuariosRow from "./UsuariosRow";
import NewUser from "./NewUser";
import {newContextComponents} from 'drizzle-react-components';


const {ContractForm} = newContextComponents;

class Usuario extends React.Component {

    state = {
        ready: false,
        usuariosLengthKey: null,
        administradorKey: null,
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    //prevProps es this.props y prevState es this.state
    componentDidUpdate(prevProps, prevState, snapshoot) {
        const {drizzle, drizzleState} = this.props;
        const instanceState = drizzleState.contracts.Usuarios;
        if (!instanceState || !instanceState.initialized) return;

        const instance = drizzle.contracts.Usuarios;
        
        let changed = false;
        // Copiar el estado
        let {
            usuariosLengthKey
        } = JSON.parse(JSON.stringify(this.state));

        if (!usuariosLengthKey) {
            usuariosLengthKey = instance.methods.usuariosLength.cacheCall();

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
                administradorKey,
                usuariosLengthKey

            });
        }
        
    }


    render() {
        const {drizzle, drizzleState} = this.props;

        const instanceState = drizzleState.contracts.Usuarios;
        if (!this.state.ready || !instanceState || !instanceState.initialized) {
            return <span>Initializing...</span>;
        }

        let ul = instanceState.usuariosLength[this.state.usuariosLengthKey];
        ul = ul ? ul.value : "??";
        
        let administradorAddress = instanceState.administracion[this.state.administradorKey];
        administradorAddress = administradorAddress ? administradorAddress.value : "??";

        if(administradorAddress == drizzleState.accounts[0]){
            return (
                <section>
                    <h2>Usuarios registrados en el sistema </h2>
                    <table>
                        <UsuariosHead />
                        <UsuariosBody drizzle={drizzle}
                            drizzleState={drizzleState}
                            usuariosLength={ul}
                        />           
                    </table>
                    
                    <NewUser drizzle={drizzle} drizzleState={drizzleState} administradorAdd={administradorAddress} usuariosLength={ul} />

                </section>
            );
        }
        else{
            return(
                <section>
                    <NewUser drizzle={drizzle} drizzleState={drizzleState} administradorAdd={administradorAddress} usuariosLength={ul} />
                </section>
            );
        }
    }
}

export default Usuario;