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
						SUBMIT: '#signInForm.loading',
					},
				},
				reset: {
					on: {
						RESET: '#signInForm.forgotPassword',
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
			onEntry: ['error'],
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
				RESET: [
					{
						cond: 'isNoEmail',
						target: 'loggedOut.email.error.empty',
					},
					{
						cond: 'isEmailBadFormat',
						target: 'loggedOut.email.error.badFormat',
					},
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
				CANCEL: 'loggedOut',
			},
			invoke: {
				src: 'requestNewPassword',
				onDone: {
					actions: 'isPasswordRecoveryMaybe',
				},
				onError: [
					{
						cond: 'isNoEmail',
						target: 'loggedOut.email.error.empty',
					},
					{
						cond: 'isEmailBadFormat',
						target: 'loggedOut.email.error.badFormat',
					},
					{
						cond: 'isNoResponse',
						target: 'loggedOut.authService.error.communication',
					},
				],
			},
		},
	},
}
export default machineConfig
