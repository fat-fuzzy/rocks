// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */

import dom from '../../../dom'
import utils from '../../../math/utils'
import setup from '../../../webgl/setup'
import geometries from '../../../math/geometries'
import {drawScene} from './draw-scene'
import {
	initTextureBuffer,
	updateGeometryBuffers,
	setPositionAttribute,
	setTextureAttribute,
} from '../../../webgl/buffers/textures'
import {initPositionBuffer} from '../../../webgl/buffers/geometry-default-3d'

import {frag} from './shaders/fragment-shader'
import {vert} from './shaders/vertex-shader-3d'

const {DEFAULT_3D_GEOMETRY_TEX_COORDS} = geometries
let imageAssetsPath = 'images/sketches'
let filename = 'f-texture.png'
let imgWidth = 256
let imgHeight = 256
let url = `/${imageAssetsPath}/${filename}`
let gl
let vao
let program
let then = 0 // used to measure time since last frame
let programInfo = {
	errors: [],
}
let buffers
let vertexShader
let fragmentShader
let texture
let image
let error
let meta = {
	id: '014',
	draft: true,
	slug: 'texture',
	title: 'Texture',
	asset: 'texture',
	categories: ['Learning'],
	tags: ['color', 'texture', 'matrix', 'camera', 'webgl', 'webglfundamentals'],
	controls: ['loop', 'camera'],
	filename: 'f-texture.png',
}

function clear() {
	// Only continue if WebGL is available and working
	if (!gl) {
		return
	}

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
	// tell webgl to cull faces
	gl.enable(gl.CULL_FACE)
	gl.enable(gl.DEPTH_TEST) // enable depth testing
	gl.depthFunc(gl.LEQUAL) // near things obscure far things

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
		if (buffers.texCoord) gl.deleteBuffer(buffers.texCoord)
	}
	if (vertexShader) gl.deleteShader(vertexShader)
	if (fragmentShader) gl.deleteShader(fragmentShader)
	if (programInfo.program) gl.deleteProgram(programInfo.program)
}

function init(canvas) {
	// Initialize the GL context
	gl = canvas.getContext('webgl2')

	// Only continue if WebGL is available and working
	if (!gl) {
		throw Error(
			'Unable to initialize WebGL. Your browser or machine may not support it.',
		)
	}
}

async function loadImage(url, callback) {
	let image = new Image()
	image.src = url
	image.onload = callback

	return image
}

function render(canvas) {
	programInfo = loadProgram(canvas)
	// Create a vertex array object (attribute state)
	vao = gl.createVertexArray()
	// Bind the attribute/buffer set we want.
	gl.bindVertexArray(vao)
	programInfo.context.texture = loadTexture(image)

	updateGeometryBuffers(gl, buffers)
	setPositionAttribute(gl, buffers, programInfo)
	setTextureAttribute(gl, buffers, programInfo, DEFAULT_3D_GEOMETRY_TEX_COORDS)
}

async function main(canvas) {
	init(canvas)
	image = await loadImage(url, () => render(canvas))
	programInfo.context = geometries.getGeometryTexture()
	return programInfo.context
}

function draw(now) {
	// Calculate frame rate
	// Convert time to seconds
	now *= 0.001
	let deltaTime = now - then
	// Save time for next draw
	then = now

	// Rotate the angle
	programInfo.context.geometry.rotation[1] +=
		programInfo.context.animationSpeed * deltaTime

	// Bind the VAO
	gl.bindVertexArray(vao)
	drawScene(gl, programInfo, buffers)

	// Unbind the VAO when we're done drawing
	gl.bindVertexArray(null)
}

function update({texture, geometry, camera}) {
	programInfo.context = {
		texture: {
			image,
		},
		...geometries.getGeometryTexture(),
	}
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
		texture: {
			image,
		},
		...geometries.getGeometryTexture(),
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
			u_matrix: gl.getUniformLocation(program, 'u_matrix'),
		},
		context: geometries.getGeometryTexture(),
		errors: [],
	}

	vao = gl.createVertexArray()
	gl.bindVertexArray(vao)

	buffers = {
		...initPositionBuffer(gl),
		...initTextureBuffer(gl),
	}
	error = gl.getError()
	if (error !== gl.NO_ERROR) {
		programInfo.errors.push(error)
	}

	return _programInfo
}

export default {init, meta, main, draw, clear, update, stop}
