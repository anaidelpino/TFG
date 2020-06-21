import Cotizaciones from "./contracts/Cotizaciones.json";
import Empresas from "./contracts/Empresas.json";
import Usuarios from "./contracts/Usuarios.json";

const options = {
  contracts: [Cotizaciones, Empresas, Usuarios],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    }
  }
};

export default options;