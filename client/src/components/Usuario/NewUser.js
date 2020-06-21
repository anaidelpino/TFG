import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";
import {Container, Form} from 'reactstrap';

const { AccountData, ContractData, ContractForm } = newContextComponents;

class NewUser extends React.Component {

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
        const {drizzle, drizzleState, administradorAdd, usuariosLength} = this.props;
        const instanceState = drizzleState.contracts.Usuarios;

        if (!this.state.ready) {
            return <tbody></tbody>;
        }

        const UsuariosAddress =[];
        for (let i = 0; i < usuariosLength; i++) {
            let addr = instanceState.usuarios[this.state.usuarioAddrsKeys[i]];
            addr = addr ? addr.value : "";
            if(addr!==""){
                UsuariosAddress.push(addr);
            }
        }

        var usuarioExiste = false;
        for (let i = 0; i<UsuariosAddress.length; i++){
            if(drizzleState.accounts[0] == UsuariosAddress[i]){
                usuarioExiste=true;
            }
        }

        if(usuarioExiste){
            return(
                <section>
                    <br/>
                    <h5>Datos del usuario:</h5>
                    <ContractData
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="Usuarios"
                        method="quienSoy"
                        render={user =>(
                            <>
                                <formulario>
                                    <Form className="formulario">
                                        <h4><li> Nombre: <b>{user._nombre}</b></li></h4>
                                        <h4><li> Apellidos: <b>{user._apellidos}</b></li></h4>
                                        <h4><li> DNI: <b>{user._DNI}</b></li></h4>
                                        <h4><li> Email: <b>{user._email}</b></li></h4>
                                        <h4><li> Teléfono: <b>{user._telefono}</b></li></h4>
                                    </Form>
                                </formulario>
                            </>
                        )}
                    />
                </section>
            )
        }
        else if(administradorAdd == drizzleState.accounts[0]){
            return (
                <section>
                    <br/>
                    <h2>Registrar un usuario</h2>
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract={"Usuarios"}
                        method={"creaUsuario"}
                        labels={['Address','Nombre','Apellidos','Teléfono','DNI','Email']}            
                    />  
                </section>
            );
        }
        else{
            return(
                <section>
                    <br/>
                    <h6>Usted no está registrado como usuario en el sistema</h6>
                </section>
            )   
        }
    }
}

export default NewUser;