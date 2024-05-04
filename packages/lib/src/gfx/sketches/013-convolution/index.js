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
// let imgHeight = 620
// let imgWidth = 518
let imagePath = `${host}/${imageAssetsPath}/${filename}`
let gl
let program
let vao
let programInfo = {}
let buffers
let vertexShader
let fragmentShader
let texture
let image
let level = 1

function clear() {
	if (!gl) {
		throw Error('Unable to initialize WebGL. Your browser or machine may not support it.')
	}

	gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight)
	// Set the clear color to darkish green.
	gl.clearColor(0.0, 0.0, 0.0, 0.0)
	// Clear the context with the newly set color. This is
	// the function call that actually does the drawing.
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

function init(canvas) {
	// Initialize the GL context
	gl = canvas.getContext('webgl2')

	// Only continue if WebGL is available and working
	if (gl === null) {
		throw Error('Unable to initialize WebGL. Your browser or machine may not support it.')
	}

	image = new Image()
	image.src = imagePath

	return {
		image,
		translation: [0, 0],
		width: imgWidth,
		height: imgHeight,
		effects: ['normal'],
		level,
	}
}

function main(canvas, context) {
	image.onload = () => {
		programInfo = loadProgram()
		programInfo.context = loadTexture(image, context)
		// Create a vertex array object (attribute state)
		vao = gl.createVertexArray()

		// Bind the attribute/buffer set we want.
		gl.bindVertexArray(vao)

		updateBuffers(gl, programInfo, buffers)
		setPositionAttribute(gl, buffers, programInfo)
		setTextureAttribute(gl, buffers, programInfo)

		// Unbind the VAO when we're done drawing
		gl.bindVertexArray(null)
	}
}

function draw(time) {
	utils.resize(gl.canvas)

	clear()

	// Bind the VAO
	gl.bindVertexArray(vao)

	drawScene(gl, programInfo, {level})

	// Unbind the VAO when we're done drawing
	gl.bindVertexArray(null)
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(image, context) {
	texture = gl.createTexture()
	// make unit 0 the active texture uint
	// (ie, the unit all other texture commands will affect)
	gl.activeTexture(gl.TEXTURE0)

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
		effects: context.filters?.effects ?? ['normal'],
		level,
	}
}

function loadProgram() {
	vertexShader = setup.compile(gl, gl.VERTEX_SHADER, vert)
	fragmentShader = setup.compile(gl, gl.FRAGMENT_SHADER, frag)

	if (vertexShader && fragmentShader) {
		program = setup.link(gl, vertexShader, fragmentShader)
		if (program) {
			gl.useProgram(program)
		}
	}

	// Collect all the info needed to use the shader program.
	// Look up which attribute our shader program is using
	// for aVertexPosition and look up uniform locations.

	programInfo = {
		program,
		attribLocations: {
			a_position: gl.getAttribLocation(program, 'a_position'),
			a_texCoord: gl.getAttribLocation(program, 'a_texCoord'),
		},
		uniformLocations: {
			// bind u_matrix
			u_resolution: gl.getUniformLocation(program, 'u_resolution'),
			u_image: gl.getUniformLocation(program, 'u_image'),
			u_kernel: gl.getUniformLocation(program, 'u_kernel[0]'),
			u_kernelWeight: gl.getUniformLocation(program, 'u_kernelWeight'),
			u_flipY: gl.getUniformLocation(program, 'u_flipY'),
			u_level: gl.getUniformLocation(program, 'u_level'),
		},
	}

	buffers = initBuffers(gl)

	setPositionAttribute(gl, buffers, programInfo)
	setTextureAttribute(gl, buffers, programInfo)

	return programInfo
}

function update(canvas, {filters}) {
	programInfo.context = {
		image,
		translation: [0, 0],
		width: imgWidth,
		height: imgHeight,
		effects: filters?.effects ?? ['normal'],
		level,
	}
}

export default {init, main, draw, clear, update, stop}
