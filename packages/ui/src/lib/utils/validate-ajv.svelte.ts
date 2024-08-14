import validations from '@fat-fuzzy/validation'
import {UiStatus} from '$types'
const {ajvValidate} = validations
/**
 * Use this Class to provide frontend validation capabilities to a form rendered by the server.
 * @param {string} formId The id of the <form> element
 * @param {FormData} formData The form data object
 * @param {string} validationFunctionName The name of the AJV validation function to use, generated using the package `@fat-fuzzy/validation` (`SignUpValidationFunction` is the default validation function for the sample SignUp form component). To Change the default validation function or add a new function, you must modify the `@fat-fuzzy/validation` package (TODO: define schemas in apps): add the schema of the form to `ajv.schema.forms.js` and rebuild the package
 * @returns a validation class with utility methods to validate the form and fields, check and manage field statuses, and manage feedback messages
 */
class AjvValidator {
	form: {[key: string]: any} = $state({})
	errors: string[] = $state([])
	ajvValidate: any = $state(() => ({}))

	constructor(validationFunctionName: string) {
		this.form = {}
		this.errors = []
		this.ajvValidate = ajvValidate // @ts-expect-error need to add types for ajvValidate
		this.ajvValidate = ajvValidate[validationFunctionName]
	}

	init(formData: FormData) {
		if (!formData) {
			// We shouldn't reach this state: the data should be available, or the server should have returned an error before reaching this point and the form should not have been rendered
			// console.error('Error fetching form data')
		} else {
			for (const [name, value] of formData) {
				this.form[name] = {
					feedback: {},
					touched: false,
					changed: false,
					value,
				}
			}
		}
	}

	validate() {
		let fields = Object.keys(this.form)
		this.errors = []
		const validateMap: {[fieldName: string]: string} = {}
		fields.forEach((field) => {
			validateMap[field] = this.form[field].value
		})
		let valid = this.ajvValidate(validateMap)

		if (!valid) {
			this.errors = this.ajvValidate.errors
			fields.forEach((name: any) => {
				let inputErrors = this.errors
					.filter((error: any) => error.instancePath.substring(1) === name)
					.map((error: any) => error.message)
				if (inputErrors.length) {
					this.form[name].feedback[UiStatus.error] = inputErrors
					this.form[name].is_valid = false
				}
			})
		} else {
			this.errors = []
			fields.forEach((field: any) => {
				this.form[field].is_valid = true
				this.form[field].feedback[UiStatus.error] = undefined
			})
		}
	}

	formHasErrors(): boolean {
		return this.errors.length > 0
	}

	fieldHasError(fieldName: string) {
		const field = this.form[fieldName]
		return field?.changed && !field.is_valid
	}

	getFieldErrors(name: string): string[] {
		let errors = this.form[name]?.feedback[UiStatus.error]
		return errors?.length ? errors : undefined
	}

	validateInput(event: Event) {
		if (event.target instanceof HTMLInputElement) {
			this.validate()
		}
	}

	touchInput(event: Event) {
		if (event.target instanceof HTMLInputElement) {
			const field = event.target.name
			this.form[field].touched = true
		}
	}

	changeInput(event: Event) {
		if (event.target instanceof HTMLInputElement) {
			const name = event.target.name
			this.form[name].changed = true
		}
		// validate the field when it changes: remove this if you want to validate the form only on `blur` or `submit` events
		// Use a debounce mechanism for slow/complex/async validations (e.g. API calls)
		this.validateInput(event)
	}
}

export default AjvValidator
