import db from "./Database.js"

export default async function (req, res) {
	try {
		console.log("Request on create user: " + JSON.stringify(req.body))

		var user = await db.Users.create({
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
			walletToken: req.body.walletToken,
			walletKey: req.body.walletKey
		})

		if (user) {
			res.status(200).send(user)
		} else {
			console.log("Failed to create user")
			res.status(400).send("Invalid username or password")
		}


	} catch (e) {
		console.log("Error:")
		console.warn(e)
	}

}