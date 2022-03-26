import {assign} from 'xstate'
import {isEmail} from 'validator'
import {signIn} from './authService'

const isNoEmail = (context, event) => {
	console.log('isNoEmail - context')
	console.log(context)

	console.log('isNoEmail - event')
	console.log(event)

	return context.email.length === 0
}
const isEmailBadFormat = (context, event) => context.email.length > 0 && !isEmail(context.email)
const isNoPassword = (context, event) => context.password.length === 0
const isPasswordShort = (context, event) => context.password.length < 5
const isNoAccount = (context, event) => event.data.code === 1
const isIncorrectPassword = (context, event) => event.data.code === 2
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
			isNoAccount,
			isIncorrectPassword,
			isNoResponse,
			isInternalServerErr,
		},
		services: {
			requestSignIn: (context, event) => signIn(context.email, context.password),
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
