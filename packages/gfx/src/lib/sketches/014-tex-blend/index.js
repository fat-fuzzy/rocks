// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */

import dom from '../../dom'
import setup from '../../webgl/setup'
import {drawScene} from './draw-scene'
import {
	initBuffers,
	updateBuffers,
	setPositionAttribute,
	setTextureAttribute,
} from '../../webgl/buffers/textures'

import {frag} from './shaders/fragment-shader'
import {vert} from './shaders/vertex-shader-3d'

let imageAssetsPath = 'images'

let files = [
	{
		filename: 'plants.png',
		width: 620,
		height: 518,
	},
	{
		filename: 'alpha.png',
		width: 620,
		height: 518,
	},
]

let meta = {
	id: '014',
	slug: 'tex-blend',
	title: 'Tex Blend',
	asset: 'multiple-tex',
	tags: ['matrix', 'texture' /* , 'webgl' */, 'io'],
	controls: ['texture'],
	images: ['plants.png', 'mineral.png'],
	filters: {
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
}

function convertToChannelOrder(str) {
	return new Int32Array(
		str
			.split('')
			.map((c) => (c === 'r' ? 0 : c === 'a' ? 3 : c === 'g' ? 1 : 2)),
	)
}

const channels = {
	ragb: convertToChannelOrder('ragb'),
	rabg: convertToChannelOrder('rabg'),
	rbag: convertToChannelOrder('rbag'),
	rbga: convertToChannelOrder('rbga'),
	rgba: convertToChannelOrder('rgba'),
	rgab: convertToChannelOrder('rgab'),
	abgr: convertToChannelOrder('abgr'),
	abrg: convertToChannelOrder('abrg'),
	agrb: convertToChannelOrder('agrb'),
	agbr: convertToChannelOrder('agbr'),
	arbg: convertToChannelOrder('arbg'),
	argb: convertToChannelOrder('argb'),
	bagr: convertToChannelOrder('bagr'),
	barg: convertToChannelOrder('barg'),
	bgar: convertToChannelOrder('bgar'),
	bgra: convertToChannelOrder('bgra'),
	brga: convertToChannelOrder('brga'),
	brag: convertToChannelOrder('brag'),
	gabr: convertToChannelOrder('gabr'),
	garb: convertToChannelOrder('garb'),
	gbar: convertToChannelOrder('gbar'),
	gbra: convertToChannelOrder('gbra'),
	grab: convertToChannelOrder('grab'),
	grba: convertToChannelOrder('grba'),
}

let imagesPath = `/${imageAssetsPath}/`
let gl
let program
let vao
let programInfo = {
	errors: [],
}
let textures = []
let buffers
let vertexShader
let fragmentShader
let imgWidth = 620
let imgHeight = 518
let images = []
let level = 1
let channelOrder
let blur = 0
let error

function init(canvas) {
	// Initialize the GL context
	gl = canvas.getContext('webgl2')

	// Only continue if WebGL is available and working
	if (gl === null) {
		throw Error(
			'Unable to initialize WebGL. Your browser or machine may not support it.',
		)
	}
}

function main(canvas) {
	init(canvas)
	clear()
	let urls = files.map((file) => `${imagesPath}${file.filename}`)
	loadImages(urls, (loadedImages) => {
		programInfo = loadProgram(canvas)
		vao = gl.createVertexArray()
		gl.bindVertexArray(vao)
		programInfo.context = loadTextures(loadedImages)
		updateBuffers(gl, programInfo, buffers)
		setPositionAttribute(gl, buffers, programInfo)
		setTextureAttribute(gl, buffers, programInfo)
		error = gl.getError()
		if (error !== gl.NO_ERROR) {
			programInfo.errors.push(error)
		} else {
			programInfo.errors = []
		}
		gl.bindVertexArray(null)
	})

	return programInfo.context
}

function loadProgram(canvas) {
	vertexShader = setup.compile(gl, gl.VERTEX_SHADER, vert)
	fragmentShader = setup.compile(gl, gl.FRAGMENT_SHADER, frag)

	if (vertexShader && fragmentShader) {
		program = setup.link(gl, vertexShader, fragmentShader)
		if (program) {
			gl.useProgram(program)
		}
	}

	dom.resize(canvas)

	// Collect all the info needed to use the shader program.
	// Look up which attribute our shader program is using
	// for aVertexPosition and look up uniform locations.

	let _programInfo = {
		program,
		attribLocations: {
			a_position: gl.getAttribLocation(program, 'a_position'),
			a_texCoord: gl.getAttribLocation(program, 'a_texCoord'),
		},
		uniformLocations: {
			// bind u_matrix
			u_resolution: gl.getUniformLocation(program, 'u_resolution'),
			u_image0: gl.getUniformLocation(program, 'u_image0'),
			u_image1: gl.getUniformLocation(program, 'u_image1'),
			// u_kernel: gl.getUniformLocation(program, 'u_kernel[0]'),
			// u_kernelWeight: gl.getUniformLocation(program, 'u_kernelWeight'),
			// u_flipY: gl.getUniformLocation(program, 'u_flipY'),
			// u_level: gl.getUniformLocation(program, 'u_level'),
		},
		context: {
			effects: ['normal'],
			width: imgWidth,
			height: imgHeight,
			level,
		},
		errors: [],
	}

	buffers = initBuffers(gl)
	setPositionAttribute(gl, buffers, _programInfo)
	setTextureAttribute(gl, buffers, _programInfo)

	return _programInfo
}

function loadImage(url, callback) {
	let image = new Image()
	image.src = url
	image.onload = callback

	return image
}

function loadImages(urls, callback) {
	let imagesToLoad = urls.length

	// Called each time an image finished loading.
	let onImageLoad = function () {
		--imagesToLoad
		// If all the images are loaded call the callback.
		if (imagesToLoad === 0) {
			callback(images)
		}
	}

	for (let ii = 0; ii < imagesToLoad; ++ii) {
		let image = loadImage(urls[ii], onImageLoad)
		images.push(image)
	}
}

function loadTexture(image) {
	const texture = gl.createTexture()

	gl.bindTexture(gl.TEXTURE_2D, texture)

	// Because images have to be downloaded over the internet
	// they might take a moment until they are ready.
	// Until then put a single pixel in the texture so we can
	// use it immediately. When the image has finished downloading
	// we'll update the texture with the contents of the image.

	const level = 0
	const internalFormat = gl.RGBA
	const srcFormat = gl.RGBA
	const srcType = gl.UNSIGNED_BYTE

	gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image)

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

	return texture
}

function loadTextures(images) {
	for (let i = 0; i < images.length; i++) {
		textures[i] = loadTexture(images[i])
	}
	return {
		images,
		translation: [0, 0],
		width: imgWidth,
		height: imgHeight,
	}
}

function draw(t) {
	clear()
	dom.resize(gl.canvas)
	drawScene(gl, programInfo, {textures, channels: channels[channelOrder], blur})
	error = gl.getError()
	if (error !== gl.NO_ERROR) {
		programInfo.errors.push(error)
	} else {
		programInfo.errors = []
	}
}

function update({filters}) {
	if (filters.channels !== channelOrder) {
		channelOrder = filters.channels
	}
	if (filters.blur !== blur) {
		blur = filters.blur
	}
	programInfo.context = {
		images,
		translation: [0, 0],
		effects: filters?.effects ?? ['normal'],
		level,
	}
}

function clear() {
	if (!gl) {
		return
	}

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

	// Clear the canvas
	gl.clearColor(0.0, 0.0, 0.0, 0.0)
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
	// - tell WebGL how to covert clip space values for gl_Position back into screen space (pixels)
	// -> use gl.viewport
	gl.clearDepth(1.0) // clear everything (?)

	// tell webgl to cull faces
	// gl.depthFunc(gl.LEQUAL) // near things obscure far things
}

function stop() {
	clear()
	if (buffers) {
		if (buffers.positionBuffer) gl.deleteBuffer(buffers.positionBuffer)
		if (buffers.texCoordBuffer) gl.deleteBuffer(buffers.texCoordBuffer)
	}
	if (vertexShader) gl.deleteShader(vertexShader)
	if (fragmentShader) gl.deleteShader(fragmentShader)
	if (programInfo.program) gl.deleteProgram(programInfo.program)
}

export default {init, meta, main, draw, update, clear, stop}
