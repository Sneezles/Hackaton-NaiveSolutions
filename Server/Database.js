import Sequelize from "sequelize";
import Users from "./Models/User.js"
import Content from "./Models/Content.js"
import execute from "./Blockchain/execute.js"
import fs from "fs"
import path from "path"


function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const db = {};
db.Sequelize = new Sequelize("postgres", "postgres", "postgres", {
	host: "localhost",
	port: "5438",
	dialect: "postgres",
	logging: false,
});

db.Users = Users(db.Sequelize);
db.Content = Content(db.Sequelize)

db.Content.belongsTo(db.Users, {
	foreignKey: "creator",
	constraints: false
});

if (1) {
	var grep = await execute("pgrep -fa bitcoin")
	console.log("Grep: ")
	console.log(grep)
	await timeout(1000)
	try {

		await execute("pkill -f bitcoin")
		await timeout(1000)
	} catch (e) {
		console.log(e)
	}
	var lines = await execute("cd NodeData; ls")
	lines = lines.split("\n")
	for (let line of lines) {
		try {
			await execute(process.env["LIB_PATH"] + "bin/bitcoin-cli -datadir=NodeData/" + line + " stop")
		} catch (e) {
			console.log(e)
		}
	}

	await execute("cd NodeData; rm -rf *")

	db.Sequelize.sync({
		force: true,
	})
}

export default db;