

var Tx = require('ethereumjs-tx').Transaction;
let Web3 = require('web3')
let dotenv = require('dotenv');
dotenv.config();

let url = process.env.INFURA_MAIN_KEY
let web3 = new Web3(url)



//Get average gas price from last few blocks (median)
web3.eth.getGasPrice().then((result) => {
	console.log(web3.utils.fromWei(result, 'ether'))
})



//Sha3 hash from a string (different from solidity)
console.log(web3.utils.sha3('Dapp University'))
console.log(web3.utils.keccak256('Dapp University'))



//Same as Solidity
console.log(web3.utils.soliditySha3('Dapp University'))



//Random Hex
console.log(web3.utils.randomHex(0))
console.log(web3.utils.randomHex(1))
console.log(web3.utils.randomHex(8))



//Other
//Subscribe (subscribe to specific events) pending, newblockheaders, syncing, logs
//Accounts (interact with accounts)
//Personal (personal node like geth)
//Shh (whisper for chat)






