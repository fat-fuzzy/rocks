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
import {initBuffers} from '../../../webgl/buffers/geometry-default-3d'

import {frag} from './shaders/fragment-shader'
import {vert} from './shaders/vertex-shader-3d'

let gl
let programInfo = {
	errors: [],
}
let program
let vao
let buffers
let then = 0 // used to measure time since last frame
let vertexShader
let fragmentShader
let error
let meta = {
	id: '011',
	slug: 'animation-3d',
	title: 'Animation 3D',
	asset: 'animation-3d',
	categories: ['Learning'],
	tags: ['3D', 'matrix', 'camera', 'webgl', 'webglfundamentals'],
	controls: ['matrix-3d', 'loop'],
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

function main(canvas) {
	init(canvas)
	clear()
	programInfo = loadProgram(canvas)
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
		context: geometries.getGeometryAnimation3D(),
		errors: [],
	}

	vao = gl.createVertexArray()
	gl.bindVertexArray(vao)
	buffers = initBuffers(gl, _programInfo)

	error = gl.getError()
	if (error !== gl.NO_ERROR) {
		_programInfo.errors.push(error)
	}

	gl.bindVertexArray(null)

	return _programInfo
}

function draw(now) {
	// Calculate frame rate
	// Convert time to seconds
	now *= 0.001
	let deltaTime = now - then
	// Save time for next draw
	then = now
	drawScene(gl, programInfo, buffers)

	// Rotate the angle
	programInfo.context.geometry.rotation[1] +=
		programInfo.context.animationSpeed * deltaTime
	update(programInfo.context)
}

function update(context) {
	programInfo.context = context
	buffers = initBuffers(gl, programInfo)
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
		if (buffers.position) gl.deleteBuffer(buffers.position)
	}
	if (vertexShader) gl.deleteShader(vertexShader)
	if (fragmentShader) gl.deleteShader(fragmentShader)
	if (programInfo.program) gl.deleteProgram(programInfo.program)
}

export default {init, meta, main, draw, update, clear, stop}
