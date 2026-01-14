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

	validationHandler() {
		return {
			set: (target: FormToValidate, field: string, value: string | number) => {
				// TODO: this is not used: why ?
				return Reflect.set(
					target,
					field,
					this.sanitize(this.inputTypes[field], value),
				)
			},
			get: (target: FormToValidate, field: string) => {
				return target[field]
			},
		}
	}

	async destroy() {
		this.form = new Proxy({}, this.validationHandler())
		this.inputTypes = {}
		this.errors = []
		this.ajvValidate = () => ({})
	}

	async init(formData: FormData, fields: InputTypes) {
		this.inputTypes = fields
		const inputs: FormToValidate = {}

		// Make sure every expected field is covered
		for (const name in this.inputTypes) {
			inputs[name] = {
				feedback: {},
				touched: false,
				changed: false,
			}
		}

		this.form = new Proxy(inputs, this.validationHandler())

		// Initialize field value
		for (const [name, value] of formData) {
			if (typeof value !== 'object') {
				this.form[name].value = this.sanitize(this.inputTypes[name], value)
			} else {
				// TODO: handle file inputs
			}
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
		const errors = this.form[name]?.feedback['error']
		return errors
	}

	public validateInput(event: Event) {
		const target = event.target as HTMLInputElement
		const name = target.name
		const value = target.value

		this.form[name] = {
			...this.form[name],
			value: this.sanitize(this.inputTypes[name], value),
		}
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
