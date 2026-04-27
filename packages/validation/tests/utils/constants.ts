const schemas = [
	{
		name: 'Form',
		fn: 'FormValidationFunction',
		properties: ['username', 'email', 'password', 'confirm_password'],
		valid: {
			username: 'a.6',
			email: 'a.6@example.com',
			password: 'ThisIsNotSecure!!!123',
			confirm_password: 'ThisIsNotSecure!!!123',
		},
	},
]

export default {schemas}
