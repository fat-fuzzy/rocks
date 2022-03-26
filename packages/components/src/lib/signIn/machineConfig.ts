const emailStates = {
	initial: 'noError',
	states: {
		noError: {},
		error: {
			initial: 'empty',
			states: {
				empty: {},
				badFormat: {},
				noAccount: {},
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
				incorrect: {},
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
						SUBMIT: '#signInForm.awaitingResponse',
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
	initial: 'ready',
	states: {
		ready: {
			type: 'parallel' as const,
			on: {
				INPUT_EMAIL: {
					actions: 'cacheEmail',
					target: 'ready.email.noError',
				},
				INPUT_PASSWORD: {
					actions: 'cachePassword',
					target: 'ready.password.noError',
				},
				SUBMIT: [
					{
						cond: 'isNoEmail',
						target: 'ready.email.error.empty',
					},
					{
						cond: 'isEmailBadFormat',
						target: 'ready.email.error.badFormat',
					},
					{
						cond: 'isNoPassword',
						target: 'ready.password.error.empty',
					},
					{
						cond: 'isPasswordShort',
						target: 'ready.password.error.tooShort',
					},
					{
						target: 'awaitingResponse',
					},
				],
			},
			states: {
				email: {...emailStates},
				password: {...passwordStates},
				authService: {...authServiceStates},
			},
		},
		awaitingResponse: {
			on: {
				CANCEL: 'ready',
			},
			invoke: {
				src: 'requestSignIn',
				onDone: {
					actions: 'onSuccess',
				},
				onError: [
					{
						cond: 'isNoAccount',
						target: 'ready.email.error.noAccount',
					},
					{
						cond: 'isIncorrectPassword',
						target: 'ready.password.error.incorrect',
					},
					{
						cond: 'isNoResponse',
						target: 'ready.authService.error.communication',
					},
					{
						cond: 'isInternalServerErr',
						target: 'ready.authService.error.internal',
					},
				],
			},
		},
	},
}
export default machineConfig
