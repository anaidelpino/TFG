const Empresas = artifacts.require("Empresas");
module.exports = function(deployer) {
  deployer.deploy(Empresas, '0xbbcF386bA89fb568B4e7A247721ED284C74E483D');
};
