import db from "./Database.js"
import sendFounds from "./Blockchain/sendFunds.js"

export default async function (req, res) {
	try {
		console.log("Request on send payment: " + JSON.stringify(req.body))

		var consumer = await db.Users.findOne({
			where: {
				id: req.body.from
			}
		})
		var creator = await db.Users.findOne({
			where: {
				id: req.body.to
			}
		})


		console.log("Sending payment from " + consumer.dataValues.name + " to " + creator.dataValues.name + " amount: " + req.body.price)

		await sendFounds(consumer.dataValues.name, creator.dataValues.name, req.body.price)

		console.log("Send successful")
		res.status(200).send("Send successful")


	} catch (e) {

		console.log("Error:")
		console.warn(e)
		res.status(400).send("Failed to get content")
	}

}