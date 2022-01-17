

var Tx = require('ethereumjs-tx').Transaction;
let Web3 = require('web3')
let dotenv = require('dotenv');
dotenv.config();

let url = process.env.INFURA_MAIN_KEY
let web3 = new Web3(url)



//BLOCKS
//block number
//who it was mined by
//number of transactions
//block reward



//Get latest block number
web3.eth.getBlockNumber().then(console.log)
web3.eth.getBlockNumber((err, result) => {
	console.log(result)
})



//Get Latest Block
web3.eth.getBlock('latest').then((block) => {
	//block hash
	//gas
	//hash
	//nonce
	//number
	//size
	//timestamp
	//transactions
	console.log(block.hash)
	console.log(block.number)
})



//Get by Block Number
web3.eth.getBlock('14025217').then((block) => {
	console.log(block.hash)
	console.log(block.number)
})



//Get by Block Hash
web3.eth.getBlock('0xb3ca13de8d5a9f442d1e47fbfba4499a8a48ba82ea686537f60baac718d48f3b').then((block) => {
	console.log(block.hash)
	console.log(block.number)
})



//Get latest 10 Block hashes
web3.eth.getBlockNumber().then((latest) => {
	for(let i=0; i<10; i++) {
		web3.eth.getBlock(latest-i).then((block) => {
			console.log(block.hash)
		})
	}
})



//Latest Block
web3.eth.getBlock('latest').then((block) => {
	console.log(block.difficulty)
	console.log(block.hash)
	console.log(block.miner)
	console.log(block.nonce)
	console.log(block.number)
	//size in bytes (amount of data contained inside block)
	console.log(block.size)
	console.log(block.parentHash)
	console.log(block.timestamp)
	console.log(block.transactions)
})



//Get a Single Random Block Transaction
web3.eth.getTransactionFromBlock('0x050740fe6341d1733d909ff9450f4d2f53bf1f99f3c9d9c54b60b5a212d2567d', 2).then((transaction) => {
	console.log(transaction)
})






















