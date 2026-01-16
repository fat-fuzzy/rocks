import validations from '@fat-fuzzy/validation'
import type {
	IFormValidator,
	InputTypes,
	FormToValidate,
	FieldToValidate,
	SchemaToValidate,
	ValidationError,
} from './validation'
const {sanitize, validate} = validations

/**
 * Use this Class to provide frontend validation capabilities to a form rendered by the server.
 * @param {string} formId The id of the <form> element
 * @param {FormData} formData The form data object
 * @param {string} validationFunctionName The name of the AJV validation function to use (see package `@fat-fuzzy/validation`'s README)
 * @returns a validation class with utility methods to validate the form and fields, check and manage field statuses, and manage feedback messages
 */
class FormValidator implements IFormValidator {
	form: FormToValidate = {}
	inputTypes: InputTypes = {} // Map of input names to their types
	errors: ValidationError[] = []
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ajvValidate: any = () => ({})
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sanitize: any = sanitize.sanitizeForm

	constructor(validationFunctionName: string) {
		// @ts-expect-error need to add types for ajvValidate
		this.ajvValidate = validate[validationFunctionName]
	}

	validationHandler(fieldName: string) {
		return {
			set: (
				target: FieldToValidate,
				prop: string,
				value: FormDataEntryValue,
			) => {
				let sanitized = value

				if (prop === 'value') {
					const inputType = this.inputTypes[fieldName]
					sanitized = this.sanitize(inputType, value)
				}

				return Reflect.set(target, prop, sanitized)
			},
			get: (target: FieldToValidate, prop: string) => {
				// if (prop in target && prop === 'value') {
				// 	return this.sanitize(this.inputTypes[prop], target[prop])
				// }
				return Reflect.get(target, prop)
			},
		}
	}

	async destroy() {
		this.form = {}
		this.inputTypes = {}
		this.errors = []
		this.ajvValidate = () => ({})
	}

	async init(formData: FormData, fields: InputTypes) {
		this.inputTypes = fields

		// Make sure every expected field is covered
		for (const name in this.inputTypes) {
			const fieldData: FieldToValidate = {
				feedback: {},
				touched: false,
				changed: false,
				value: undefined,
				is_valid: undefined,
			}
			this.form[name] = new Proxy(fieldData, this.validationHandler(name))
		}
		// Initialize field value
		for (const [name, value] of formData) {
			if (typeof value !== 'string') {
				// TODO: handle file inputs
				continue
			}

			// This assignment triggers the Proxy set handler!
			this.form[name].value = value
		}
	}

	preValidate(fields: string[]): SchemaToValidate {
		// Reset error states before validation
		this.errors = []
		const schema: SchemaToValidate = {}

		fields.forEach((field) => {
			if (this.form[field]?.changed) {
				this.form[field].is_valid = true
				this.form[field].feedback = {
					...this.form[field].feedback,
					error: undefined,
				}
				schema[field] = this.form[field].value
			}
		})

		return schema
	}

	postValidate(fields: string[]): void {
		fields.forEach((field) => {
			const inputErrors = this.errors
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.filter((error: any) => error.instancePath.substring(1) === field)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.map((error: any) => error.message)

			if (inputErrors.length) {
				this.form[field].is_valid = false
				this.form[field].feedback['error'] = inputErrors
			} else {
				this.form[field].is_valid = true
				this.form[field].feedback['error'] = undefined
			}
		})
	}

	public validate() {
		const fields = Object.keys(this.form)
		const schema = this.preValidate(fields)

		const valid = this.ajvValidate(schema)
		if (!valid) {
			this.errors = this.ajvValidate.errors
		}

		this.postValidate(fields)
	}

	public formHasErrors(): boolean {
		return this.errors.length > 0
	}

	public fieldHasError(fieldName: string) {
		const field = this.form[fieldName]
		return field?.changed && !field.is_valid
	}

	public getFieldErrors(name: string): string[] | undefined {
		const errors = this.form[name]?.feedback.error
		return errors
	}

	public validateInput(event: Event) {
		const target = event.target as HTMLInputElement
		const name = target.name
		const value = target.value

		this.form[name].value = value

		this.validate()
	}

	public touchInput(event: Event) {
		const target = event.target as HTMLInputElement
		const name = target.name

		this.form[name].touched = true
	}

	public changeInput(event: Event) {
		const target = event.target as HTMLInputElement
		const name = target.name

		this.form[name].changed = true
		// validate the field when it changes:
		// - remove this if you want to validate the form only on `blur` or `submit` events
		// - use a debounce mechanism for slow/complex/async validations (e.g. API calls)
		this.validateInput(event)
	}
}

export default FormValidator
