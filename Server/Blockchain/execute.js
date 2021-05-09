import { exec } from "child_process"

export default async function execute(command) {
	console.log("Excetuting: " + command)
	return new Promise((resolve, reject) => {
		try {
			exec(command, (error, stdout, stderr) => {
				if (error) return reject(error)
				if (stderr) return reject(stderr)
				resolve(stdout)
			})
		} catch (e) {
			console.log(e)
			return reject(stderr)
		}
	})
}

