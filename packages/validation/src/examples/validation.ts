export type InputTypes = {[name: string]: string}
export type FieldToValidate = {
	feedback: {[key: string]: string[] | undefined}
	touched: boolean
	changed: boolean
	value?: FormDataEntryValue
	is_valid?: boolean
}

export type FormToValidate = {
	[key: string]: FieldToValidate
}

export type SchemaToValidate = {
	[fieldName: string]: FormDataEntryValue | undefined
}

export type ValidationError = {instancePath: string; message: string}

export interface IFormValidator {
	form: FormToValidate
	inputTypes: InputTypes
	errors: ValidationError[]
	ajvValidate: unknown
	sanitize: unknown

	validationHandler?(fieldName: string): ProxyHandler<object> // Do not use this with Svelte runes
	setFieldValue?(field: string, value: string): void
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
