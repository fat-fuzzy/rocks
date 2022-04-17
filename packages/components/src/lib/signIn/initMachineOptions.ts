import {assign} from 'xstate'
import {isEmail} from 'validator'
import {authenticate} from './authService'

const isNoEmail = (context, event) => {
	return event.type === 'SUBMIT' && context.email.length === 0
}
const isEmailBadFormat = (context, event) =>
	event.type === 'SUBMIT' && context.email.length > 0 && !isEmail(context.email)
const isNoPassword = (context, event) => event.type === 'SUBMIT' && context.password.length === 0
const isPasswordShort = (context, event) => event.type === 'SUBMIT' && context.password.length < 5
const isLoginFailed = (context, event) => event.data.code === 2
const passwordRecoveryMaybe = (context, event) => event.data.code === 1
const isSignInEmailSent = (context, event) => event.data.code === 0
const isNoResponse = (context, event) => event.data.code === 3
const isInternalServerErr = (context, event) => event.data.code === 4

function initMachineOptions({
	handleEmailInputFocus,
	handlePasswordInputFocus,
	handleSubmitButtonFocus,
}) {
	const machineOptions = {
		guards: {
			isNoEmail,
			isEmailBadFormat,
			isNoPassword,
			isPasswordShort,
			isLoginFailed,
			passwordRecoveryMaybe,
			isSignInEmailSent,
			isNoResponse,
			isInternalServerErr,
		},
		services: {
			requestSignIn: (context, event) => authenticate(context.email, context.password),
		},
		actions: {
			focusEmailInput: handleEmailInputFocus,
			focusPasswordInput: handlePasswordInputFocus,
			focusSubmitButton: handleSubmitButtonFocus,
			cacheEmail: assign((context, event) => {
				return {
					email: event.email,
				}
			}),
			cachePassword: assign((context, event) => ({
				password: event.password,
			})),
			onSuccess: assign(() => {
				alert('🎉 Signed in')
			}),
		},
	}

	return {...machineOptions}
}

export default initMachineOptions
