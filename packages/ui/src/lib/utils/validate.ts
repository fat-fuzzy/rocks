import type {
	AjvValidateFunction,
	ErrorObject,
	TestForm,
	SignUp,
	CookiePreferences,
} from '$types'

import * as validators from '$lib/generated/ajv/validate.ajv.mjs'

export function getTypedValidatorFunction<T>(
	fn: (data: unknown) => boolean,
): AjvValidateFunction<T> {
	const wrapped = ((data: unknown): data is T =>
		fn(data)) as AjvValidateFunction<T>
	wrapped.errors = undefined
	Object.defineProperty(wrapped, 'errors', {
		get: () => (fn as {errors?: ErrorObject[] | null}).errors,
	})
	return wrapped
}

export const TestFormValidator = getTypedValidatorFunction<TestForm>(
	validators.TestFormValidationFunction,
)

export const CookiePreferencesValidator =
	getTypedValidatorFunction<CookiePreferences>(
		validators.CookiePreferencesValidationFunction,
	)

export const SignUpValidator = getTypedValidatorFunction<SignUp>(
	validators.SignUpValidationFunction,
)
