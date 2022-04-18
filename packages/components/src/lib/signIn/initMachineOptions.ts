import {assign} from 'xstate'
import {isEmail} from 'validator'
import {authenticate, requestPassword} from './authService'

export const Events = {
	SUBMIT: 'SUBMIT',
	CANCEL: 'CANCEL',
	FORGOT_PASSWORD: 'FORGOT_PASSWORD',
	RESET_PASSWORD: 'RESET_PASSWORD',
	INPUT_EMAIL: 'INPUT_EMAIL',
	INPUT_PASSWORD: 'INPUT_PASSWORD',
}

const testEmailEventType = (event) =>
	event.type === Events.SUBMIT ||
	event.type === Events.RESET_PASSWORD ||
	event.type === Events.INPUT_EMAIL
const isNoEmail = (context, event) => {
	const eventType = testEmailEventType(event)
	return eventType && context.email.length === 0
}
const isEmailBadFormat = (context, event) => {
	const eventType = testEmailEventType(event)
	return eventType && context.email.length > 0 && !isEmail(context.email)
}
const isNoPassword = (context, event) =>
	event.type === Events.SUBMIT && context.password.length === 0
const isPasswordShort = (context, event) =>
	event.type === Events.SUBMIT && context.password.length < 5
const isSignInEmailSent = (context, event) => event.data.code === 0
const isPasswordRecoveryMaybe = (context, event) => event.data.code === 1
const isLoginFailed = (context, event) => event.data.code === 2
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
			isPasswordRecoveryMaybe,
			isSignInEmailSent,
			isNoResponse,
			isInternalServerErr,
		},
		services: {
			requestSignIn: (context, event) => authenticate(context.email, context.password),
			requestNewPassword: (context, event) => requestPassword(context.email),
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
			isPasswordRecoveryMaybe: assign(() => {
				alert(
					'💌  If that email address is in our database, we will send you an email to reset your password.',
				)
			}),
		},
	}

	return {...machineOptions}
}

export default initMachineOptions
