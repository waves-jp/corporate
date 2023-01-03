const Mint = artifacts.require('Mint')

module.exports = async (deployer) => {
  await deployer.deploy(Mint)

  // const i = await Mint.deployed()

  // console.log((await i.getCurrentId()).toString())

  // await i.mint('0x6DF6D6C9986A79EBb831F8E5095FAe5D0f05e863')

  // console.log((await i.getCurrentId()).toString())
  // console.log(
  //   (
  //     await i.balanceOf('0x6DF6D6C9986A79EBb831F8E5095FAe5D0f05e863')
  //   ).toString(),
  // )

  // await i.mint('0x6DF6D6C9986A79EBb831F8E5095FAe5D0f05e863')

  // console.log((await i.getCurrentId()).toString())
  // console.log(
  //   (
  //     await i.balanceOf('0x6DF6D6C9986A79EBb831F8E5095FAe5D0f05e863')
  //   ).toString(),
  // )
  // await i.mint('0x6DF6D6C9986A79EBb831F8E5095FAe5D0f05e863')

  // console.log((await i.getCurrentId()).toString())
  // console.log(
  //   (
  //     await i.balanceOf('0x6DF6D6C9986A79EBb831F8E5095FAe5D0f05e863')
  //   ).toString(),
  // )
  // await i.mint('0x6DF6D6C9986A79EBb831F8E5095FAe5D0f05e863')

  // console.log((await i.getCurrentId()).toString())
  // console.log(
  //   (
  //     await i.balanceOf('0x6DF6D6C9986A79EBb831F8E5095FAe5D0f05e863')
  //   ).toString(),
  // )
}
