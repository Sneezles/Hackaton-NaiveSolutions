import execute from "./execute.js"

export default async function sendFunds(fromName, toAddres, price) {

	var address = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=NodeData/" + toAddres + " getnewaddress")
	console.log("addres:" + address)

	await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=NodeData/" + fromName + " sendtoaddress " + address.replace("\n", "") + " " + price)

	await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=Network generate 1")

	return true;
}
