export interface IFormValidator {
	form: {[key: string]: any}
	inputTypes: {[name: string]: string}
	errors: string[]
	ajvValidate: any

	validationHandler(): ProxyHandler<any>
	validate: () => void
	init(formData: FormData, fields: {[name: string]: string}): void
	formHasErrors(): boolean
	fieldHasError(name: string): boolean
	getFieldErrors(name: string): string[]
	validateInput(event: Event): void
	touchInput(event: Event): void
	changeInput(event: Event): void
}
