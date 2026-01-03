export type InputTypes = {[name: string]: string}
export type FormToValidate = {
	[key: string]: {
		feedback: {[key: string]: string[] | undefined}
		touched: boolean
		changed: boolean
		value?: FormDataEntryValue
		is_valid?: boolean
	}
}

export interface IFormValidator {
	form: FormToValidate
	inputTypes: InputTypes
	errors: string[]
	ajvValidate: unknown

	validationHandler(): ProxyHandler<object>
	validate: () => void
	init(formData: FormData, fields: InputTypes): void
	destroy(): void
	formHasErrors(): boolean
	fieldHasError(name: string): boolean
	getFieldErrors(name: string): string[] | undefined
	validateInput(event: Event): void
	touchInput(event: Event): void
	changeInput(event: Event): void
}
