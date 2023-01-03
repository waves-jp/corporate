const Mint = artifacts.require('Mint')

const TO_ADDRESS = '0x112DeC5b652602A43c68e64fC01426B152283463'

const PARAMS = {
  name: 'test',
  description: 'test mint',
  image: 'https://iili.io/HfllwsS.png',
  external_url: 'https://example.com',
}

module.exports = async (deployer) => {
  await deployer.deploy(Mint)

  // const instance = await Mint.deployed()

  // const tx = await instance.mint(TO_ADDRESS, JSON.stringify(PARAMS))
  // console.log('mintedId: ', tx)
}
