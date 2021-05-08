import db from "./Database.js"

export default async function (req, res) {
	try {
		console.log("Request on login: " + JSON.stringify(req.body))

		var user = await db.Users.findOne({
			where: {
				email: req.body.email
			}
		})

		console.log(user)

		if (user && user.dataValues.password == req.body.password) {
			res.status(200).send(user)
		} else {
			console.log("Invalid username or password")
			res.status(400).send("Invalid username or password")
		}


	} catch (e) {
		console.log("Error:")
		console.warn(e)
	}

}