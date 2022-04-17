// error code 1 - no account
// error code 2 - wrong password
// error code 3 - no response
// error code 4 - internal server error

const isNoResponse = () => Math.random() >= 0.75
const isLoginFailed = (email, password) => email !== 'admin@admin.com' || password !== 'admin'
const passwordRecoveryMaybe = (email) => ({email})
const isSignInEmailSent = (email) => ({email})

export const requestPassword = (email) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (passwordRecoveryMaybe(email)) {
				resolve({code: 1, payload: {email}})
			}

			if (isNoResponse()) {
				reject({code: 3})
			}

			// if (isInternalServerErr()) {
			// 	reject({code: 4})
			// }

			resolve(null)
		}, 1500)
	})

export const authenticate = (email, password) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isLoginFailed(email, password)) {
				reject({code: 2})
			}

			if (isSignInEmailSent(email)) {
				resolve({code: 1, payload: {email}})
			}

			if (isNoResponse()) {
				reject({code: 3})
			}

			// if (isInternalServerErr()) {
			// 	reject({code: 4})
			// }

			resolve(null)
		}, 1500)
	})
