export const schemas = {
	Form: {
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
	RouteParam: {
		name: 'RouteParam',
		fn: 'RouteParamValidationFunction',
		properties: ['name', 'type'],
		valid: {
			name: 'language',
			type: 'atomic',
		},
	},
	Route: {
		name: 'Route',
		fn: 'RouteValidationFunction',
		properties: ['id', 'name', 'allowedParams'],
		valid: {
			id: '/doc/compare',
			name: 'compare',
			allowedParams: [
				{name: 'language', type: 'atomic'},
				{name: 'section', type: 'multiple'},
				{name: 'source_sections', type: 'csv'},
				{name: 'target_sections', type: 'csv'},
			],
		},
	},
	Namespace: {
		name: 'Namespace',
		fn: 'NamespaceValidationFunction',
		properties: ['namespace', 'route', 'children'],
		valid: {
			namespace: 'doc',
			route: '/doc',
			children: [
				{
					id: '/doc/compare',
					name: 'compare',
					allowedParams: [
						{name: 'language', type: 'atomic'},
						{name: 'section', type: 'multiple'},
						{name: 'source_sections', type: 'csv'},
						{name: 'target_sections', type: 'csv'},
					],
				},
			],
		},
	},
}
