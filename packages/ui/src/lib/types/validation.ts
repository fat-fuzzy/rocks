export type InputTypes = {[name: string]: string}
export type FieldToValidate = {
	feedback: {[key: string]: string[] | undefined}
	type: string
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

export interface IFormValidator<K> {
	form: FormToValidate
	inputTypes: InputTypes
	errors: ValidationError[]
	ajvValidate: AjvValidateFunction<K>
	sanitize: unknown

	setFieldValue?(field: string, value: string): void
	validate: () => void
	init(formData: FormData, fields: InputTypes): void
	destroy(): void
	formHasErrors(): boolean
	fieldHasChanged(name: string): boolean
	fieldHasError(name: string): boolean
	getFieldErrors(name: string): string[] | undefined
	validateInput(event: Event): void
	touchInput(event: Event): void
	changeInput(event: Event): void
}

/****************************************
 * AJV: Types for generated functions
 ****************************************/
export interface AjvValidateFunction<T> {
	(data: unknown): data is T
	errors?: ValidationError[]
}

export type ValidatorMap<T> = Record<string, AjvValidateFunction<T>>

export type ErrorObject = {
	instancePath: string
	message: string
}
