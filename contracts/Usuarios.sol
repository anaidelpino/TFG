pragma solidity >=0.5.0;

contract Usuarios {
    
    //dirección de la administración
    address public administracion;
    
    constructor(address _administracion) public {
        administracion = address(_administracion);
    }

    //Un usuario contiene:
    struct Usuario {
        string nombre;
        string apellidos;
        uint telefono;
        string DNI;
        string email;
    }
    
    //asocio a cada usuario una dirección
    mapping (address => Usuario) public usuario;
    //Hacer un mapping de DNIs (string => address)
    mapping (string => address) dni;

    //array de usuarios, devuelve el usuario en esa posición
    address[] public usuarios;
    string[] public dnis;
    
    //devuelve cantidad de usuarios en el array
      function usuariosLength() public view returns(uint) {
        return usuarios.length;
    }
    
    //usuario nuevo, sólo lo puede crear la administracion
      function creaUsuario (address _usuario, string memory _nombre, string memory _apellidos, uint _telefono, string memory _DNI, string memory _email) soloAdministracion public returns (uint) {
        string memory _dniUser = usuario[_usuario].DNI;
        bytes memory c = bytes(_dniUser);
        require(c.length == 0, "Solo permitido a usuarios no registrados");
        bytes memory b = bytes(_DNI);
        require(b.length != 0, "El DNI no puede ser vacio");
        Usuario memory user = Usuario(_nombre, _apellidos, _telefono, _DNI, _email);
        usuario[_usuario] = user;
        dni[_DNI] = _usuario;
        usuarios.push(_usuario);
        dnis.push(_DNI);
        return usuarios.length - 1;
    }
    
    //me muestra el usuario asociado a la dirección actual
    function quienSoy() soloRegistrados public view returns (string memory _nombre, string memory _apellidos, uint _telefono, string memory _DNI, string memory _email) {
        Usuario memory user = usuario[msg.sender];
        _nombre = user.nombre;
        _apellidos = user.apellidos;
        _telefono = user.telefono;
        _DNI = user.DNI;
        _email = user.email;
    }
    
    modifier soloRegistrados() {
        string memory _DNI = usuario[msg.sender].DNI;
        bytes memory b = bytes(_DNI);
        require(b.length != 0, "Usted no está registrado en el sistema");
        _;
    }
    
    modifier noRegistrados() {
        string memory _DNI = usuario[msg.sender].DNI;
        bytes memory b = bytes(_DNI);
        require(b.length == 0, "Solo permitido a usuarios no registrados");
        _;
    }
          
       modifier soloAdministracion() {
        require(msg.sender == administracion, "Esta acción sólo puede ser realizada por la administracion");
        _;
    }
}
