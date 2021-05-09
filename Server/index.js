import dotenv from 'dotenv'
dotenv.config()
// require('dotenv').config()
import express from "express"
import db from "./Database.js"
import BodyParser from "body-parser"
import onLogin from "./onLogin.js"
import onCreateUser from "./onCreateUser.js"
import onAddContent from "./onAddContent.js"
import onGetContent from "./onGetContent.js"
import onSendPayment from "./onSendPayment.js"
import execute from "./Blockchain/execute.js"
import onGetBalance from "./onGetBalance.js"

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

console.log(process.env)

const app = express();
const port = 8000;
try {

	// await db.Sequelize.sync({
	// 	force: false,
	// })
	try {
		try {
			var uptime = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=Network uptime")
			console.log("Uptime for network: " + uptime)
			var balance = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=Network getbalance")
			console.log(balance)
		} catch (e) {
			console.log("Starting new server")
			await execute(process.env["LIB_PATH"] + "bin/bitcoind -datadir=Network -daemon")
			await timeout(10000)
			var out = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=Network generate 150")
			console.log(out)
			var balance = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=Network getbalance")
			console.log(balance)
		}
	} catch (e) {
		console.log(e)
	}

	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Headers", "*");
		next();
	});


	app.use(BodyParser.json())

	app.get('/', (req, res) => {
		res.send('Hello World!')
	});

	app.post("/login", onLogin)
	app.post("/createUser", onCreateUser)
	app.post("/addContent", onAddContent)
	app.post("/getContent", onGetContent)
	app.post("/sendPayment", onSendPayment)
	app.post("/getBalance", onGetBalance)

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}!`)
	});
} catch (e) {
	console.log("catch error")
	console.warn(e)
}
