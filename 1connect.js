

let Web3 = require('web3')
let dotenv = require('dotenv');
dotenv.config();



// VIDEO LINK https://www.youtube.com/watch?v=DFCCcgr9dAQ&list=PLS5SEs8ZftgXlCGXNfzKdq7nGBcIaVOdN&index=7
// Smart contract development (backend)
// Client to talk to blockchain (frontend)
// Javascript Client > JSON-RPC Protocol > EVM Ethereum Virtual Machine > Nodes
// Access an ethereum node over JSON RPC quickly.
// Copy link to a production network.
// Connect to remote node.



//CONNECT TO MAIN NET
//connect infura
let url = process.env.INFURA_MAIN_KEY
let web3 = new Web3(url)



//Get balance 
web3.eth.getBalance(address, (err, bal) => {
	let balance = bal

	//balance in 'ether'
	//ether
	//gwei
	//Gwei
	let etherBalance = web3.utils.fromWei(balance, 'ether')
})



//CREATE AN ACCOUNT
//create new ethereum account
web3.eth.accounts.create()



//CONNECT LOCAL
//connect to blockchain locally (running in ganache)
//run ganache
//RPC server address
var web3Local = new Web3('http://127.0.0.1:7545')
let addressLocal = process.env.LOCAL_ACCOUNT_1

web3Local.eth.getBalance(addressLocal, (err, bal) => {
	console.log(bal)
})
















