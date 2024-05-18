let host = 'http://localhost:5173'
let imageAssetsPath = '$lib/images'

const sketches = [
	{
		id: '001',
		slug: 'random-rect',
		title: 'Random',
		asset: 'emoji:random',
		dimensions: 'video',
		tags: ['2D' /* , 'webgl' */],
		meta: {},
	},
	// {
	// 	id: '002',
	// 	slug: 'random-rect-audio',
	// 	title: 'Audio',
	// 	asset: '🥁',
	//  tags:['random', 'audio'],
	// },
	{
		id: '003',
		slug: 'rectangle-2d',
		title: 'Rectangle 2D',
		asset: 'emoji:rect',
		tags: ['2D' /* , 'webgl' */],
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
		tags: ['2D' /* , 'webgl' */],
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
		tags: ['2D', 'matrix' /* , 'webgl' */],
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
		tags: ['2D', 'matrix' /* , 'webgl' */],
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
		tags: ['2D', 'matrix' /* , 'webgl' */],
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
		tags: ['2D', 'matrix' /* , 'webgl' */],
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
		tags: ['3D', 'matrix' /* , 'webgl' */],
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
		tags: ['3D', 'camera' /* , 'webgl' */],
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
		tags: ['3D', 'matrix', 'camera' /* , 'webgl' */],
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
		tags: ['color', 'texture' /* , 'webgl' */],
		meta: {
			input: 'form',
			type: 'texture',
			filename: 'plants.png',
			channels: [
				'ragb',
				'rabg',
				'rbag',
				'rbga',
				'rgba',
				'rgab',
				'abgr',
				'abrg',
				'agrb',
				'agbr',
				'arbg',
				'argb',
				'bagr',
				'barg',
				'bgar',
				'bgra',
				'brga',
				'brag',
				'gabr',
				'garb',
				'gbar',
				'gbra',
				'grab',
				'grba',
			],
			blur: [1, 2, 3],
		},
	},
	{
		id: '013',
		slug: 'convolution',
		title: 'Convolution',
		asset: 'emoji:convolution',
		tags: ['matrix', 'texture' /* , 'webgl' */],
		meta: {
			input: 'form',
			type: 'texture',
			filename: 'plants.png',
			convolutions: [
				'normal',
				'gaussianBlur',
				'gaussianBlur2',
				'gaussianBlur3',
				'unsharpen',
				'sharpness',
				'sharpen',
				'edgeDetect',
				'edgeDetect2',
				'edgeDetect3',
				'edgeDetect4',
				'edgeDetect5',
				'edgeDetect6',
				'sobelHorizontal',
				'sobelVertical',
				'previtHorizontal',
				'previtVertical',
				'boxBlur',
				'triangleBlur',
				'emboss',
			],
		},
	},
	{
		id: '014',
		slug: 'multiple-tex',
		title: 'Multiple Textures',
		asset: 'emoji:multiple-tex',
		tags: ['matrix', 'texture' /* , 'webgl' */, 'io'],
		meta: {
			input: 'form',
			type: 'texture',
			images: ['plants.png', 'mineral.png'],
			channels: [
				'ragb',
				'rabg',
				'rbag',
				'rbga',
				'rgba',
				'rgab',
				'abgr',
				'abrg',
				'agrb',
				'agbr',
				'arbg',
				'argb',
				'bagr',
				'barg',
				'bgar',
				'bgra',
				'brga',
				'brag',
				'gabr',
				'garb',
				'gbar',
				'gbra',
				'grab',
				'grba',
			],
			blur: [1, 2, 3],
		},
	},
]

export default sketches
