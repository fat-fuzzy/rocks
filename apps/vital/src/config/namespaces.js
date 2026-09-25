const NAMESPACES_CONFIG = {
	chlorophyll: {
		namespace: 'chlorophyll',
		route: '/chlorophyll',
		theme: 'accent',
		children: [
			{
				id: '/chlorophyll/edit',
				name: 'edit',
				allowedParams: [
					{name: 'language', type: 'atomic'},
					{name: 'format', type: 'atomic'},
					{name: 'sections', type: 'multiple'},
					{name: 'preset', type: 'atomic'},
				],
			},
			{
				id: '/chlorophyll/build',
				name: 'build',
				allowedParams: [
					{name: 'language', type: 'atomic'},
					{name: 'format', type: 'atomic'},
					{name: 'sections', type: 'multiple'},
					{name: 'preset', type: 'atomic'},
				],
			},
			{
				id: '/chlorophyll/compare',
				name: 'compare',
				allowedParams: [
					{name: 'language', type: 'atomic'},
					{name: 'format', type: 'atomic'},
					{name: 'sections', type: 'multiple'},
					{name: 'preset', type: 'atomic'},
					{name: 'source_root', type: 'atomic'},
					{name: 'source_language', type: 'atomic'},
					{name: 'source_format', type: 'atomic'},
					{name: 'source_preset', type: 'multiple'},
					{name: 'source_sections', type: 'csv'},
					{name: 'source_tags', type: 'csv'},
					{name: 'target_root', type: 'atomic'},
					{name: 'target_language', type: 'atomic'},
					{name: 'target_format', type: 'atomic'},
					{name: 'target_preset', type: 'multiple'},
					{name: 'target_sections', type: 'csv'},
					{name: 'target_tags', type: 'csv'},
				],
			},
			{
				id: '/chlorophyll/preview',
				name: 'preview',
				allowedParams: [
					{name: 'language', type: 'atomic'},
					{name: 'format', type: 'atomic'},
					{name: 'preset', type: 'atomic'},
				],
			},
		],
	},
	pollen: {
		namespace: 'pollen',
		route: '/pollen',
		theme: 'info',
		children: [
			{
				id: '/pollen/write',
				name: 'write',
				allowedParams: [
					{name: 'language', type: 'atomic'},
					{name: 'format', type: 'atomic'},
					{name: 'sections', type: 'multiple'},
					{name: 'preset', type: 'atomic'},
				],
			},
			{
				id: '/pollen/reflect',
				name: 'reflect',
				allowedParams: [
					{name: 'language', type: 'atomic'},
					{name: 'format', type: 'atomic'},
					{name: 'sections', type: 'multiple'},
					{name: 'preset', type: 'atomic'},
				],
			},
			{
				id: '/pollen/explore',
				name: 'explore',
				allowedParams: [
					{name: 'language', type: 'atomic'},
					{name: 'format', type: 'atomic'},
					{name: 'sections', type: 'multiple'},
					{name: 'preset', type: 'atomic'},
					{name: 'source_root', type: 'atomic'},
					{name: 'source_language', type: 'atomic'},
					{name: 'source_format', type: 'atomic'},
					{name: 'source_preset', type: 'multiple'},
					{name: 'source_sections', type: 'csv'},
					{name: 'source_tags', type: 'csv'},
					{name: 'target_root', type: 'atomic'},
					{name: 'target_language', type: 'atomic'},
					{name: 'target_format', type: 'atomic'},
					{name: 'target_preset', type: 'multiple'},
					{name: 'target_sections', type: 'csv'},
					{name: 'target_tags', type: 'csv'},
				],
			},
		],
	},
}

export default NAMESPACES_CONFIG
