pragma solidity >=0.5.0;

contract Cotizaciones {
    
    //dirección de la administración 
    address public administracion;
    
    
    constructor(address _administracion) public {
        administracion = address(_administracion);
    }
    
    
    //Asocio address de usuario con address de empresa con array de cotizaciones
    mapping (address => mapping (address => Cotizacion[])) public cotizaciones;
    
    mapping (address => address[]) public empleados;
    mapping (address => address[]) public empresas;
    
    
    Cotizacion[] public todasCotizaciones;
    
    
    //Una cotización contiene:
    struct Cotizacion {
        uint cantidad;
        string mes;
        uint ano;
    }
     
    
    function contrata(address empresa, address empleado) public{
        empleados[empresa].push(empleado);
        empresas[empleado].push(empresa);
    }
    
    function empleadosLength(address empresa) public view returns(uint){
       return empleados[empresa].length;
    }

    function empresasLength(address empleado) public view returns(uint){
       return empresas[empleado].length;
    }
    
    function misEmpleadosLength() public view returns(uint){
        return empleados[msg.sender].length;
    }

    function misEmpresasLength() public view returns(uint){
        return empresas[msg.sender].length;
    }

    function empleado() public view returns(uint){
        if (empleados[msg.sender].length != 0){
            return 0;
        }else{
            return 1;
        }
    }

    function creaCotizacion(address usuario, address empresa, uint _cantidad, string memory _mes, uint _ano) public {
        Cotizacion memory cot = Cotizacion(_cantidad, _mes, _ano);
        cotizaciones[usuario][empresa].push(Cotizacion(_cantidad, _mes, _ano));
        todasCotizaciones.push(cot);    
    }
    
    function cotizacionesLength() public view returns(uint) {
        return todasCotizaciones.length;
    }
    
    function numeroCotizaciones(address _usuario, address _empresa) public view returns (uint){
        return cotizaciones[_usuario][_empresa].length;
    }
    
    function numeroCotizacionesEmpresa(address _usuario) public view returns (uint){
        return cotizaciones[_usuario][msg.sender].length;
    }

    function numeroCotizacionesUsuario(address _empresa) public view returns (uint){
        return cotizaciones[msg.sender][_empresa].length;
    }
    
    function misCotizaciones(address usuario, uint num) public view returns(uint _cantidad, string memory _mes, uint _ano){
        Cotizacion memory cot = cotizaciones[usuario][msg.sender][num];
        _cantidad = cot.cantidad;
        _mes = cot.mes;
        _ano = cot.ano;
    }
    
}
