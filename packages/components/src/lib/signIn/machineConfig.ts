const emailStates = {
	initial: 'noError',
	states: {
		noError: {},
		error: {
			initial: 'empty',
			states: {
				empty: {},
				badFormat: {},
			},
			onEntry: 'focusEmailInput',
		},
	},
}

const passwordStates = {
	initial: 'noError',
	states: {
		noError: {},
		error: {
			initial: 'empty',
			states: {
				empty: {},
				tooShort: {},
			},
			onEntry: 'focusPasswordInput',
		},
	},
}

const authServiceStates = {
	initial: 'noError',
	states: {
		noError: {},
		error: {
			initial: 'communication',
			states: {
				communication: {
					on: {
						SUBMIT: '#signInForm.loading',
					},
				},
				login: {
					on: {
						SUBMIT: {
							target: '#signInForm.loggedOut',
							// actions: 'onLoginFailed',
						},
						FORGOT_PASSWORD: '#signInForm.forgotPassword',
					},
				},
				forgot: {
					on: {
						RESET_PASSWORD: '#signInForm.resetPassword',
					},
				},
				reset: {
					on: {
						RESET_PASSWORD: '#signInForm.resetPassword',
					},
				},
				internal: {},
			},
		},
	},
}

const machineConfig = {
	id: 'signInForm',
	context: {
		email: '',
		password: '',
	},
	initial: 'loggedOut',
	states: {
		loggedOut: {
			type: 'parallel' as const,
			on: {
				INPUT_EMAIL: {
					actions: 'cacheEmail',
					target: 'loggedOut.email.noError',
				},
				INPUT_PASSWORD: {
					actions: 'cachePassword',
					target: 'loggedOut.password.noError',
				},
				SUBMIT: [
					{
						cond: 'isNoEmail',
						target: 'loggedOut.email.error.empty',
					},
					{
						cond: 'isEmailBadFormat',
						target: 'loggedOut.email.error.badFormat',
					},
					{
						cond: 'isNoPassword',
						target: 'loggedOut.password.error.empty',
					},
					{
						cond: 'isPasswordShort',
						target: 'loggedOut.password.error.tooShort',
					},
					{
						target: 'loading',
					},
				],
				FORGOT_PASSWORD: [
					{
						target: 'forgotPassword',
					},
				],
				CANCEL: [
					{
						target: 'loggedOut',
					},
				],
			},
			states: {
				email: {...emailStates},
				password: {...passwordStates},
				authService: {...authServiceStates},
			},
		},
		loading: {
			on: {
				CANCEL: 'loggedOut',
			},
			invoke: {
				src: 'requestSignIn',
				onDone: {
					actions: 'onSuccess',
					target: 'loggedIn',
				},
				onError: [
					{
						cond: 'isLoginFailed',
						target: 'loggedOut.authService.error.login',
					},
					{
						cond: 'isNoResponse',
						target: 'loggedOut.authService.error.communication',
					},
					{
						cond: 'isInternalServerErr',
						target: 'loggedOut.authService.error.internal',
					},
				],
			},
		},
		forgotPassword: {
			on: {
				INPUT_EMAIL: {
					actions: 'cacheEmail',
					target: 'forgotPassword.email.noError',
				},
				RESET_PASSWORD: [
					{
						cond: 'isNoEmail',
						target: 'forgotPassword.email.error.empty',
					},
					{
						cond: 'isEmailBadFormat',
						target: 'forgotPassword.email.error.badFormat',
					},
					{
						target: 'resetPassword',
					},
				],
				CANCEL: [
					{
						target: 'loggedOut',
					},
				],
			},
			states: {
				email: {...emailStates},
				authService: {...authServiceStates},
			},
		},
		resetPassword: {
			on: {
				CANCEL: 'loggedOut',
			},
			invoke: {
				src: 'requestNewPassword',
				onDone: {
					actions: 'isPasswordRecoveryMaybe',
					target: 'loggedOut',
				},
				onError: [
					{
						cond: 'isNoResponse',
						target: 'forgotPassword.authService.error.communication',
					},
				],
			},
		},
		loggedIn: {
			on: {
				LOGOUT: 'loggedOut',
			},
		},
	},
}
export default machineConfig
