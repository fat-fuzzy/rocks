import * as validators from '$lib/generated/ajv/validate.ajv.mjs'
import FormValidator from '$lib/utils/browser/FormValidator.svelte'

class SignUpUser {
	inputTypes: {[name: string]: string} = {
		username: 'text',
		email: 'email',
		password: 'password',
		confirm_password: 'password',
	}
	/**
	 * Initialize default SignUp object with an undefined user
	 */
	constructor() {}

	/**
	 * Update SignUp based on inputs
	 */
	signup(formData: FormData) {
		const validator = new FormValidator('SignUpValidationFunction', validators)

		validator.init(formData, this.inputTypes)
		validator.validate()

		if (validator.errors.length > 0) {
			throw new Error('Validation failed')
		}
		// API calls
		// - necessary checks and backend validation
		// - call your identity management API to sign up the user
		return true
	}

	/**
	 * Serialize SignUp so it can be set as a cookie
	 */
	toString() {
		return ''
	}
}

export default SignUpUser
