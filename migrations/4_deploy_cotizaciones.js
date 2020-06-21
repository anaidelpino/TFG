const Cotizaciones = artifacts.require("Cotizaciones");
module.exports = function(deployer) {
  deployer.deploy(Cotizaciones, '0xbbcF386bA89fb568B4e7A247721ED284C74E483D');
};
