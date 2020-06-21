import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";
import {Form} from 'reactstrap';

const { AccountData, ContractData, ContractForm } = newContextComponents;

class Contrataciones extends React.Component {

    state = {
        ready: false
    }

    componentDidMount() {
        this.setState({ready: true});
    }



    render() {
        const {drizzle, drizzleState, empleados, administradorAdd} = this.props;

        const instanceState = drizzleState.contracts.Cotizaciones;

        if (!this.state.ready) {
            return <tbody></tbody>;
        }
        if(empleados == 0 || administradorAdd == drizzleState.accounts[0]){
        return (
        <section>
        <br/>
        <h2>Añadir un empleado a la base de datos</h2>
        <Form className="otroform">
        <ContractForm
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract={"Cotizaciones"}
            method={"contrata"}
            labels={['Empresa','Empleado']}         
            
        />
        </Form>
        
        </section>
    );
}else{
    return(
    <section></section>
    )
}
    }
    
}


export default Contrataciones;