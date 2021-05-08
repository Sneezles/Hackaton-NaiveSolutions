import express from "express"
import db from "./Database.js"
import BodyParser from "body-parser"
import onLogin from "./onLogin.js"
import onCreateUser from "./onCreateUser.js"
import onAddContent from "./onAddContent.js"
import onGetContent from "./onGetContent.js"
import onSendPayment from "./onSendPayment.js"
const app = express();
const port = 8000;
try {

	// await db.Sequelize.sync({
	// 	force: false,
	// })

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

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}!`)
	});
} catch (e) {
	console.log("catch error")
	console.warn(e)
}
