import db from "./Database.js"

export default async function (req, res) {
	try {
		console.log("Request on get contents: " + JSON.stringify(req.body))

		var content = await db.Content.findAll({
		})

		//console.log(content.le)


		res.status(200).send(content)


	} catch (e) {

		console.log("Error:")
		console.warn(e)
		res.status(400).send("Failed to get content")
	}

}