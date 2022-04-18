// response code 0 - sign in email sent
// response code 1 - password recovery email sent, maybe
// response code 2 - login failed
// response code 3 - no response
// response code 4 - internal server error

// OWASP guide to Authentication error responses:
// https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses

const isNoResponse = () => Math.random() >= 0.75
const isLoginFailed = (email, password) => email !== 'admin@admin.com' || password !== 'admin'
const passwordRecoveryMaybe = (email) => ({email})
const isSignInEmailSent = (email) => ({email})

export const requestPassword = (email) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isNoResponse()) {
				reject({code: 3})
			}

			if (passwordRecoveryMaybe(email)) {
				resolve({code: 1, payload: {email}})
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

			if (isNoResponse()) {
				reject({code: 3})
			}

			if (isSignInEmailSent(email)) {
				resolve({code: 0, payload: {email}})
			}
			// if (isInternalServerErr()) {
			// 	reject({code: 4})
			// }

			resolve(null)
		}, 1500)
	})
