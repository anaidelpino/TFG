pragma solidity >=0.5.0;

contract Empresas {
    
    //dirección de la administración
    address public administracion;
    
    constructor(address _administracion) public {
        administracion = address(_administracion);
    }
    
    //Una empresa contiene:
    struct Empresa {
        string nombre;
        string CIF;
        uint telefono;
        string email;
    }
    
    //asocio a cada empresa una dirección
    mapping (address => Empresa) public empresa;
    //Hacer un mapping de CIFs
    mapping (string => address) cif;


    //array de empresas, devuelve la empresa en esa posición
    address[] public empresas;
    string[] public cifs;
    
    //devuelve cantidad de empresas en el array
      function empresasLength() public view returns(uint) {
        return empresas.length;
    }
    
    //empresa nueva
      function creaEmpresa(address _empresa, string memory _nombre, string memory _CIF, uint _telefono, string memory _email) soloAdministracion public returns (uint) {
        string memory _cifEmpresa = empresa[_empresa].CIF;
        bytes memory c = bytes(_cifEmpresa);
        require(c.length == 0, "Solo permitido a empresas no registradas");
        bytes memory b = bytes(_CIF);
        require(b.length != 0, "El CIF no puede ser vacio");
        Empresa memory company = Empresa(_nombre, _CIF, _telefono, _email);
        empresa[_empresa] = company;
        cif[_CIF] = _empresa;
        empresas.push(_empresa);
        cifs.push(_CIF);
        return empresas.length - 1;
    }
    
    
    //me muestra la empresa asociada a la dirección actual
    function quienSoy() soloRegistrados public view returns (string memory _nombre, string memory _CIF, uint _telefono, string memory _email) {
        Empresa memory company = empresa[msg.sender];
        _nombre = company.nombre;
        _telefono = company.telefono;
        _CIF = company.CIF;
        _email = company.email;
    }
    

    
    modifier soloRegistrados() {
        string memory _CIF = empresa[msg.sender].CIF;
        bytes memory b = bytes(_CIF);
        require(b.length != 0, "La empresa no está registrada en el sistema");
        _;
    }
    
    modifier soloAdministracion() {    
        require(msg.sender == administracion, "Esta acción sólo puede ser realizada por la administracion");
        _;
    }
    
        modifier noRegistrados() {
        string memory _CIF = empresa[msg.sender].CIF;
        bytes memory b = bytes(_CIF);
        require(b.length == 0, "Solo permitido a usuarios no registrados");
        _;
    }
}