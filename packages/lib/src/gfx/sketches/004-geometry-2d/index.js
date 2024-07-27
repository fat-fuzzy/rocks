// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */

import utils from '../../lib/utils'
import geometries from '../../lib/geometries'
import setup from '../../lib/webgl/setup'
import {drawScene} from './draw-scene'
import {initBuffers} from '../../lib/buffers/geometry-default-2d'

import {frag} from './shaders/fragment-shader'
import {vert} from './shaders/vertex-shader-scale-2d'

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
	id: '004',
	slug: 'geometry-2d',
	title: 'Geometry 2D',
	asset: 'geometry-2d',
	tags: ['2D' /* , 'webgl' */],
	controls: ['matrix-2d', 'loop'],
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

	utils.resize(canvas)

	// Collect all the info needed to use the shader program.
	// Look up which attribute our shader program is using
	// for aVertexPosition and look up uniform locations.
	let _programInfo = {
		program,
		attribLocations: {
			a_position: gl.getAttribLocation(program, 'a_position'),
		},
		uniformLocations: {
			// bind u_color
			u_color: gl.getUniformLocation(program, 'u_color'),
			// bind u_resolution
			u_resolution: gl.getUniformLocation(program, 'u_resolution'),
			// bind u_translation
			u_translation: gl.getUniformLocation(program, 'u_translation'),
			// bind u_rotation
			u_rotation: gl.getUniformLocation(program, 'u_rotation'),
			// bind u_scale
			u_scale: gl.getUniformLocation(program, 'u_scale'),
		},
		context: geometries.getGeometryDefaults(canvas.width, canvas.height),
		errors: [],
	}
	buffers = initBuffers(gl, _programInfo)
	error = gl.getError()
	if (error !== gl.NO_ERROR) {
		_programInfo.errors.push(error)
	}
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
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
	// Set the clear color to darkish green.
	gl.clearColor(0.0, 0.0, 0.0, 0.0)
	// Clear the context with the newly set color. This is
	// the function call that actually does the drawing.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
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
