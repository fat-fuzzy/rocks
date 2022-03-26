// error code 1 - no account
// error code 2 - wrong password
// error code 3 - no response
// error code 4 - internal server error

const isNoResponse = () => Math.random() >= 0.75

export const signIn = (email, password) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (email !== 'admin@admin.com') {
				reject({code: 1})
			}

			if (password !== 'admin') {
				reject({code: 2})
			}

			if (isNoResponse()) {
				reject({code: 3})
			}

			resolve(null)
		}, 1500)
	})
