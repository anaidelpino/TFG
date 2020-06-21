
const Usuarios = artifacts.require("Usuarios");
module.exports = function(deployer) {
  deployer.deploy(Usuarios, '0xbbcF386bA89fb568B4e7A247721ED284C74E483D');
};

