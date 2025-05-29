// import * as Kilt from '@kiltprotocol/sdk-js'

// async function checkIfAccountHasDID(walletAddress: string) {
//   // Initialize the KILT API connection
//   await Kilt.connect('wss://spiritnet.kilt.io')

//   const api = Kilt.ConfigService.get('api')

//   // Convert wallet address to the format used in DID storage
//   const accountId = Kilt.Did.accountToChain(walletAddress)

//   // Query DID linked to the wallet address
//   const encodedLinkedDetails = await api.call.did.queryByAccount(accountId)

//   const { did } = Kilt.Did.linkedInfoFromChain(encodedLinkedDetails)

//   if (did) {
//     console.log(`✅ Wallet address ${walletAddress} is linked to DID: ${did}`)
//     return did
//   } else {
//     console.log(`❌ No DID is linked to wallet address: ${walletAddress}`)
//     return null
//   }
// }
