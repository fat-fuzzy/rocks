import FormValidator from '$lib/utils/FormValidator.svelte'

class SignUpUser {
	inputTypes: {[name: string]: string} = {
		sample_username: 'username',
		sample_email: 'email',
		sample_password: 'password',
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
		const validator = new FormValidator('SignUpValidationFunction')

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
