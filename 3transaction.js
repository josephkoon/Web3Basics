

var Tx = require('ethereumjs-tx').Transaction;
let Web3 = require('web3')
let dotenv = require('dotenv');
dotenv.config();



//local url
let urlLocal = 'HTTP://127.0.0.1:7545'
let web3Local = new Web3(urlLocal)
//ropsten url
let url = process.env.INFURA_ROPSTEN_KEY
let web3 = new Web3(url)



//SENDING A LOCAL TRANSACTION
//broadcast a transaction to etherum
//how does a transaction work?
//writes cost gas - sending ether, call a function, deploy a smart contract

//ganache on local RPC server
const account1 = process.env.LOCAL_ACCOUNT_1
const account2 = process.env.LOCAL_ACCOUNT_2

//get balance
web3Local.eth.getBalance(account1, (err, result) => {
	console.log(result)
})
web3Local.eth.getBalance(account2, (err, result) => {
	console.log(result)
})

//send a transaction
//locally unlocked account
//on real network - you need to sign them
//unlocked (you do not need to sign them)
web3Local.eth.sendTransaction({from:account1, to:account2, value:web3.utils.toWei('1', 'ether')}, (err, result) => {
	console.log(result)
})

//geth - can unlock your account
//ganache - account is unlocked



//SENDING A ROPSTEN TRANSACTION
let account1 = process.env.ROPSTEN_ACCOUNT_1
//export PRIVATE_KEY_1 = 'your key'
//key with 0x removed
let account1key = Buffer.from(process.env.ROPSTEN_KEY_1, 'hex')

let account2 = process.env.ROPSTEN_ACCOUNT_2
//export PRIVATE_KEY_2 = 'your key'
//key with 0x removed
let account2key = Buffer.from(process.env.ROPSTEN_KEY_2, 'hex')



//Log the account balances
//note: use ropsten faucet to get test ether
web3.eth.getBalance(account1, (err, bal) => {
	console.log('account1', web3.utils.fromWei(bal, 'ether'))
})
web3.eth.getBalance(account2, (err, bal) => {
	console.log('account2', web3.utils.fromWei(bal, 'ether'))
})



//Send ropsten transaction
web3.eth.getTransactionCount(account1, (err, txCount) => {

	//1 Build transaction
	const txObject = {
		//need nonce of transaction for double spend
		nonce: web3.utils.toHex(txCount),
		//address to send to
		to: account2,
		//value to send
		value: web3.utils.toHex(web3.utils.toWei('.1', 'ether')),
		//gas limit 
		gasLimit: web3.utils.toHex(21000),
		//gas price in gwei
		gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
	}

	//2 Sign transaction with private key of sending account
	let tx = new Tx(txObject, { chain: 'ropsten' });
	tx.sign(account1key)

	//3 Broadcast transaction. needs to be serialized and converted to hax
	const serializeTransaction = tx.serialize()
	const raw = '0x' + serializeTransaction.toString('hex')


	//Send Transaction
	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		console.log('transaction', err, txHash)
	})
})



































