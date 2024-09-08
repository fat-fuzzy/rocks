const schemas = [
	{
		name: 'SignUp Form',
		fn: 'SignUpValidationFunction',
		properties: [
			'sample_username',
			'sample_email',
			'sample_password',
			'confirm_password',
		],
		valid: {
			sample_username: 'a.6',
			sample_email: 'a.6@example.com',
			sample_password: 'ThisIsNotSecure!!!123',
			confirm_password: 'ThisIsNotSecure!!!123',
		},
	},
]

export default {schemas}
