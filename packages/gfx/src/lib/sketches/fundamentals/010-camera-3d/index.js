// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */

import dom from '../../../dom'
import geometries from '../../../math/geometries'
import setup from '../../../webgl/setup'
import {drawScene} from './draw-scene'
import {initBuffers} from '../../../webgl/buffers/camera'

import {frag} from './shaders/fragment-shader'
import {vert} from './shaders/vertex-shader-3d'

let gl
let programInfo = {
	errors: [],
}
let program
let buffers
let vertexShader
let fragmentShader
let error
let meta = {
	id: '010',
	slug: 'camera-3d',
	title: 'Camera 3D',
	asset: 'camera-3d',
	categories: ['Learning'],
	tags: ['3D', 'camera', 'webgl', 'webglfundamentals'],
	controls: ['camera', 'loop'],
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

async function main(canvas) {
	init(canvas)
	clear()
	programInfo = await Promise.resolve(loadProgram(canvas))
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
			a_color: gl.getAttribLocation(program, 'a_color'),
		},
		uniformLocations: {
			// bind u_matrix
			u_matrix: gl.getUniformLocation(program, 'u_matrix'),
		},
		context: geometries.getGeometryCamera3D(),
		errors: [],
	}

	const vao = gl.createVertexArray()
	gl.bindVertexArray(vao)
	buffers = initBuffers(gl, _programInfo)
	error = gl.getError()
	if (error !== gl.NO_ERROR) {
		_programInfo.errors.push(error)
	}
	gl.bindVertexArray(null)

	return _programInfo
}

function draw() {
	drawScene(gl, programInfo, buffers)
}

function update(context) {
	programInfo.context = context
	buffers = initBuffers(gl, programInfo)
}

function clear() {
	if (!gl) {
		// TODO: handle error
		return
	}
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
	// Set the clear color to darkish green.
	gl.clearColor(0.0, 0.0, 0.0, 0.0)
	// Clear the context with the newly set color. This is
	// the function call that actually does the drawing.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

function stop() {
	clear()
	if (buffers) {
		if (buffers.position) gl.deleteBuffer(buffers.position)
	}
	if (vertexShader) gl.deleteShader(vertexShader)
	if (fragmentShader) gl.deleteShader(fragmentShader)
	if (programInfo.program) gl.deleteProgram(programInfo.program)
}

export default {init, meta, main, draw, update, clear, stop}
