import { ethers } from 'ethers'
import abiJson from '../../../../smartcontracts/build/contracts/Mint.json'
import { CONTRACT_ADDRESS, PRIVATE_KEY } from '../../../constants/env'

export default async function handler(req, res) {
  const provider = new ethers.providers.InfuraProvider('', '')
  const wallet = new ethers.Wallet('0x' + PRIVATE_KEY)
  const signer = wallet.connect(provider)
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abiJson.abi, signer)
  const { toAddress } = req.body

  console.log('toAddress', toAddress)

  const currentId = await contract.getCurrentId()
  await contract.mint(toAddress)

  res.status(200).json({
    value: currentId.toString(),
  })
}
