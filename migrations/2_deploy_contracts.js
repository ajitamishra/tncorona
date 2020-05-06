const FixNix = artifacts.require("FixNix");

module.exports = function(deployer) {
  deployer.deploy(FixNix, "0x260523e0F597f3ce69d363c406596250aedBf25B", "0xE9c35d97EEd9250238e4D6B0787911749E608a0e", "0x741F2A80892906206528Ba47d9e99C9C042bB423");
};
