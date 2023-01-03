const Mint = artifacts.require('Mint')

module.exports = async (deployer) => {
  await deployer.deploy(Mint)
}
