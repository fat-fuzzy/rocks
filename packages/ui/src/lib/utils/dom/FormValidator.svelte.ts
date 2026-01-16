import validations from '@fat-fuzzy/validation'
import type {
	IFormValidator,
	InputTypes,
	FormToValidate,
	SchemaToValidate,
	ValidationError,
} from '$types'
const {sanitize, validate} = validations

/**
 * Use this Class to provide frontend validation capabilities to a form rendered by the server.
 * @param {string} formId The id of the <form> element
 * @param {FormData} formData The form data object
 * @param {string} validationFunctionName The name of the AJV validation function to use (see package `@fat-fuzzy/validation`'s README)
 * @returns a validation class with utility methods to validate the form and fields, check and manage field statuses, and manage feedback messages
 */
class FormValidator implements IFormValidator {
	form: FormToValidate = $state({})
	inputTypes: InputTypes = $state({}) // Map of input names to their types
	errors: ValidationError[] = $state([])
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ajvValidate: any = $state(() => ({}))
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sanitize: any = sanitize.sanitizeForm

	constructor(validationFunctionName: string) {
		// @ts-expect-error need to add types for ajvValidate
		this.ajvValidate = validate[validationFunctionName]
	}

	async destroy() {
		this.form = {}
		this.inputTypes = {}
		this.errors = []
		this.ajvValidate = () => ({})
	}

	async init(formData: FormData, fields: InputTypes) {
		this.inputTypes = fields

		// Initialize all fields
		for (const name in this.inputTypes) {
			this.form[name] = {
				feedback: {},
				touched: false,
				changed: false,
				value: undefined,
				is_valid: undefined,
			}
		}

		// Set initial values with sanitization
		for (const [name, value] of formData) {
			if (typeof value === 'string') {
				this.setFieldValue(name, value)
			} else {
				// TODO: handle file inputs
			}
		}
	}

	/**
	 * Set a field value with automatic sanitization
	 */
	setFieldValue(field: string, value: string): void {
		const inputType = this.inputTypes[field]
		const sanitized = this.sanitize(inputType, value)

		// Update the entire field object to trigger Svelte reactivity
		this.form[field] = {
			...this.form[field],
			value: sanitized,
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
		return this.form[name]?.feedback.error
	}

	public validateInput(event: Event) {
		const target = event.target as HTMLInputElement
		const name = target.name
		const value = target.value

		this.setFieldValue(name, value)
		this.validate()
	}

	public touchInput(event: Event) {
		const target = event.target as HTMLInputElement
		const name = target.name

		this.form[name] = {
			...this.form[name],
			touched: true,
		}
	}

	public changeInput(event: Event) {
		const target = event.target as HTMLInputElement
		const name = target.name

		this.form[name] = {
			...this.form[name],
			changed: true,
		}
		// validate the field when it changes:
		// - remove this if you want to validate the form only on `blur` or `submit` events
		// - use a debounce mechanism for slow/complex/async validations (e.g. API calls)
		this.validateInput(event)
	}
}

export default FormValidator
