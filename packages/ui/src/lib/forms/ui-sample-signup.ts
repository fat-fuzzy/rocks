import AjvValidator from '$lib/utils/validate-ajv.svelte.js'

export class SignUpUser {
	user: {username: string} | undefined
	/**
	 * Initialize default SignUp object with an undefined user
	 */
	constructor() {}

	/**
	 * Update SignUp based on inputs
	 */
	signup(formData: FormData) {
		const validator = new AjvValidator(formData, 'SignUpValidationFunction')
		try {
			// This is a placeholder for the actual API call to test form validation on the client side
			// TODO: call your identity management API to sign up the user

			validator.validate()
			if (validator.errors.length === 0) {
				this.user = {username: 'test-user'}
			}
			return true
		} catch (e) {
			return false
		}
	}

	/**
	 * Serialize SignUp so it can be set as a cookie
	 */
	toString() {
		return JSON.stringify(this.user)
	}
}
