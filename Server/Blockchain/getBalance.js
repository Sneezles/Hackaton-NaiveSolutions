import execute from "./execute.js"

export default async function getBalance(name) {
	try {
		var balance = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=NodeData/" + name + " getbalance")
		console.log("balance:" + balance)
	} catch (e) {
		console.log("Error")
		console.log(e)
		return -1
	}
	return balance;
}
