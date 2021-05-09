import execute from "./execute.js"
import fs from "fs"
import path from "path"

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}




export default async function creteNode(name, id) {
	try {
		fs.mkdir(path.resolve() + "/NodeData/" + name, "0777", () => {

		})

		var conf = "regtest=1 	\n port=" + (7000 + id) + " 	\nrpcport=" + (9000 + id) + " 	\nconnect=127.0.0.1:8335	\nexcessiveblocksize=0		\nmaxstackmemoryusageconsensus=0"

		fs.appendFile(path.resolve() + "/NodeData/" + name + "/bitcoin.conf", conf, async function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
		await timeout(100)
		console.log("Next")
		try {
			await execute(process.env["LIB_PATH"] + "bin/bitcoind -datadir=NodeData/" + name + " -daemon")
			await timeout(6000)
			// var generata = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=NodeData/" + name + " generate 150")
			// await timeout(100)
			// console.log("Generate: ")
			// console.log(generata)
			var address = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=NodeData/" + name + " getnewaddress")
			await timeout(100);
			var ret = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=Network sendtoaddress " + address.replace("\n", "") + " 100")
			await timeout(1000)
			console.log(ret)
			var ret2 = await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=Network generate 1")
			console.log(ret2)
			return {
				account: "placeholder",
				balance: 123
			}
		} catch (e) {
			console.log(e)
		}
		//console.log(ret)
	} catch (e) {
		console.log("Error:")
		console.warn(e)
	}
}
