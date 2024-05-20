// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */

import utils from '../../lib/utils'
import setup from '../../lib/webgl/setup'
import {drawScene} from './draw-scene'
import {
	initBuffers,
	updateBuffers,
	setPositionAttribute,
	setTextureAttribute,
} from '../../lib/buffers/textures'

import {frag} from './shaders/fragment-shader'
import {vert} from './shaders/vertex-shader-3d'

let host = 'http://localhost:5173'
let imageAssetsPath = 'src/lib/images'
let filename = 'plants.png'
let imgWidth = 620
let imgHeight = 518
let url = `${host}/${imageAssetsPath}/${filename}`
let gl
let program
let programInfo = {
	errors: [],
}
let buffers
let vertexShader
let fragmentShader
let texture
let image
let channelOrder
let blur = 0
let error
let meta = {
	id: '012',
	slug: 'tex-channels',
	title: 'Tex Channels',
	asset: 'emoji:texture',
	tags: ['color', 'texture' /* , 'webgl' */],
	controls: ['texture'],
	filename: 'plants.png',
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

	}
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

function clear() {
	// Only continue if WebGL is available and working
	if (!gl) {
		return
	}

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
	// Set the clear color to black, fully transparent
	gl.clearColor(0.0, 0.0, 0.0, 0.0)
	// Clear the context with the newly set color. This is
	// the function call that actually does the drawing.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	// - tell WebGL how to covert clip space values for gl_Position back into screen space (pixels)
	// -> use gl.viewport
	gl.clearDepth(1.0) // clear everything (?)
}

function stop() {
	clear()

	if (buffers) {
		if (buffers.position) gl.deleteBuffer(buffers.position)
		if (buffers.texture) gl.deleteBuffer(buffers.texture)
	}
	if (vertexShader) gl.deleteShader(vertexShader)
	if (fragmentShader) gl.deleteShader(fragmentShader)
	if (programInfo.program) gl.deleteProgram(programInfo.program)
}

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

function loadImage(url, callback) {
	let image = new Image()
	image.src = url
	image.onload = callback

	return image
}

function render(canvas) {
	programInfo = loadProgram(canvas)
	programInfo.context = loadTexture(image)

	updateBuffers(gl, programInfo, buffers)
	setPositionAttribute(gl, buffers, programInfo)
	setTextureAttribute(gl, buffers, programInfo)
}

function main(canvas) {
	init(canvas)
	image = loadImage(url, () => render(canvas))
	return programInfo.context
}

function draw(t) {
	clear()
	utils.resize(gl.canvas)
	drawScene(gl, programInfo, {channels: channels[channelOrder], blur})
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(image) {
	texture = gl.createTexture()
	// make unit 0 the active texture uint
	// (ie, the unit all other texture commands will affect
	gl.activeTexture(gl.TEXTURE0 + 0)

	gl.bindTexture(gl.TEXTURE_2D, texture)

	// Because images have to be downloaded over the internet
	// they might take a moment until they are ready.
	// Until then put a single pixel in the texture so we can
	// use it immediately. When the image has finished downloading
	// we'll update the texture with the contents of the image.

	let textureInfo = {
		width: 1, // we don't know the size until it loads
		height: 1,
		texture,
	}
	const level = 0
	const internalFormat = gl.RGBA
	const border = 0
	const srcFormat = gl.RGBA
	const srcType = gl.UNSIGNED_BYTE
	const pixel = new Uint8Array([0, 0, 255, 255]) // opaque blue

	gl.texImage2D(
		gl.TEXTURE_2D,
		level,
		internalFormat,
		textureInfo.width,
		textureInfo.height,
		border,
		srcFormat,
		srcType,
		pixel,
	)

	textureInfo.width = image.width
	textureInfo.height = image.height

	gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture)
	gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image)

	// WebGL1 has different requirements for power of 2 images
	// vs. non power of 2 images so check if the image is a
	// power of 2 in both dimensions.
	if (utils.isPowerOf2(image.width) && utils.isPowerOf2(image.height)) {
		// Yes, it's a power of 2. Generate mips.
		gl.generateMipmap(gl.TEXTURE_2D)
	} else {
		// No, it's not a power of 2. Turn off mips and set
		// wrapping to clamp to edge
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
	}
	return {
		image,
		translation: [0, 0],
		width: imgWidth,
		height: imgHeight,
	}
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

	utils.resize(canvas)

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
			u_image: gl.getUniformLocation(program, 'u_image'),
			u_channels: gl.getUniformLocation(program, 'u_channels'),
			u_blur: gl.getUniformLocation(program, 'u_blur'),
		},
		errors: [],
	}

	buffers = initBuffers(gl)
	setPositionAttribute(gl, buffers, _programInfo)
	setTextureAttribute(gl, buffers, _programInfo)
	error = gl.getError()
	if (error !== gl.NO_ERROR) {
		programInfo.errors.push(error)
	}

	return _programInfo
}

function update({filters}) {
	if (filters.channels !== channelOrder) {
		channelOrder = filters.channels
	}
	if (filters.blur !== blur) {
		blur = filters.blur
	}

	programInfo.context = {
		image,
		translation: [0, 0],
		width: imgWidth,
		height: imgHeight,
	}
}

export default {init, meta, main, draw, clear, update, stop}
