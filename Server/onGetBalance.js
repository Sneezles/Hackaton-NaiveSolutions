import db from "./Database.js"
import getBalance from "./Blockchain/getBalance.js"
export default async function (req, res) {
	try {
		console.log("Request on get balance: " + JSON.stringify(req.body))

		var user = await db.Users.findOne({
			where: {
				id: req.body.id
			}
		})

		var balance = await getBalance(user.dataValues.name)

		//console.log(content.le)
		if (balance < 0) {
			res.status(400).send("Failed to get balance")
		}
		res.status(200).send(balance)

	} catch (e) {

		console.log("Error:")
		console.warn(e)
		res.status(400).send("Failed to get balance")
	}

}