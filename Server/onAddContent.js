import db from "./Database.js"

export default async function (req, res) {
	try {
		console.log("Request on add content: " + JSON.stringify(req.body))

		var content = await db.Content.create({
			name: req.body.name,
			type: req.body.type,
			price: req.body.price,
			data: req.body.data,
			creator: req.body.creator
		})

		if (content) {
			res.status(200).send("OK")
		} else {
			console.log("Failed to create content")
			res.status(400).send("Failed to create content")
		}

	} catch (e) {
		console.log("Error:")
		console.warn(e)
	}

}