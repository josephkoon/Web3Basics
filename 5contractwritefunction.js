

var Tx = require('ethereumjs-tx').Transaction;
let Web3 = require('web3')
let dotenv = require('dotenv');
dotenv.config();

let url = process.env.INFURA_ROPSTEN_KEY
let web3 = new Web3(url)



//SENDING A ROPSTEN TRANSACTION
let account1 = process.env.ROPSTEN_ACCOUNT_1
//export PRIVATE_KEY_1 = 'your key'
//key with 0x removed
let account1key = Buffer.from(process.env.ROPSTEN_KEY_1, 'hex')

let account2 = process.env.ROPSTEN_ACCOUNT_2
//export PRIVATE_KEY_2 = 'your key'
//key with 0x removed
let account2key = Buffer.from(process.env.ROPSTEN_KEY_2, 'hex')




//Create transactions that call smart contracts that write data
//functions that read data (no gas)
//functions that write data (need gas)
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
const contractAddress = process.env.ROPSTEN_TEST_CONTRACT

const contract = new web3.eth.Contract(contractABI, contractAddress)

contract.methods.totalSupply().call((err, result) => {
	console.log(result)
})

contract.methods.balanceOf(account1).call((err, result) => {
	console.log(result)
})



//Send ropsten transaction
web3.eth.getTransactionCount(account1, (err, txCount) => {

	//Transfer Function
	const data = contract.methods.transfer(account1, 0).encodeABI()
	//FUNCTIONS
	//allowance()
	//approve()
	//balanceOf()
	//name()
	//standard()
	//symbol()
	//totalSupply()
	//transfer()
	//transferFrom()


	//1 Build transaction
	const txObject = {
		nonce: web3.utils.toHex(txCount),
		gasLimit: web3.utils.toHex(800000),
		gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
		//send to smart contract address
		to: contractAddress,
		//encoded function name with arguments
		data: data,
	}

	//2 Sign transaction with private key of sending account
	let tx = new Tx(txObject, { chain: 'ropsten' });
	tx.sign(account1key)

	//3 Broadcast transaction. needs to be serialized and converted to hax
	const serializeTransaction = tx.serialize()
	const raw = '0x' + serializeTransaction.toString('hex')

	//Broadcast the transaction
	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		console.log('transaction', err, txHash)
	})

})































