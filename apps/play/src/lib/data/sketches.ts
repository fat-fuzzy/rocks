let host = 'http://localhost:5173'
let imageAssetsPath = '$lib/images'

export const sketches = [
	{
		id: '001',
		slug: 'random-rect',
		title: 'Random',
		asset: 'emoji:random',
		dimensions: 'video',
	},
	// {
	// 	id: '002',
	// 	slug: 'random-rect-audio',
	// 	title: 'Audio',
	// 	asset: '🥁',
	// },
	{
		id: '003',
		slug: 'rectangle-2d',
		title: 'Rectangle 2D',
		asset: 'emoji:rect',
		meta: {
			input: 'form',
			type: 'matrix-2d',
		},
	},
	{
		id: '004',
		slug: 'geometry-2d',
		title: 'Geometry 2D ',
		asset: 'emoji:geometry-2d',
		meta: {
			input: 'form',
			type: 'matrix-2d',
		},
	},
	{
		id: '005',
		slug: 'matrix-2d',
		title: 'Matrix 2D',
		asset: 'emoji:geometry-3d',
		meta: {
			input: 'form',
			type: 'matrix-2d',
		},
	},
	{
		id: '006',
		slug: 'hierarchical',
		title: 'Hierarchical',
		asset: 'emoji:russian-dolls',
		meta: {
			input: 'form',
			type: 'matrix-2d',
		},
	},
	{
		id: '007',
		slug: 'center-origin',
		title: 'Center Origin',
		asset: 'emoji:bullseye',
		meta: {
			input: 'form',
			type: 'matrix-2d',
		},
	},
	{
		id: '008',
		slug: 'projection',
		title: 'Projection',
		asset: 'emoji:projection',
		meta: {
			input: 'form',
			type: 'matrix-2d',
		},
	},
	{
		id: '009',
		slug: 'matrix-3d',
		title: 'Matrix 3D',
		asset: 'emoji:matrix-3d',
		meta: {
			input: 'form',
			type: 'matrix-3d',
			depth: 400,
		},
	},
	{
		id: '010',
		slug: 'camera-3d',
		title: 'Camera 3D',
		asset: 'emoji:camera-3d',
		meta: {
			input: 'form',
			camera: true,
		},
	},
	{
		id: '011',
		slug: 'animation-3d',
		title: 'Animation 3D',
		asset: 'emoji:animation-3d',
		meta: {
			input: 'form',
			type: 'matrix-3d',
		},
	},
	{
		id: '012',
		slug: 'texture',
		title: 'Texture',
		asset: 'emoji:texture',
		meta: {
			input: 'form',
			type: 'texture',
			filename: 'plants.png',
		},
	},
]
