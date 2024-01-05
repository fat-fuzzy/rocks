// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */

import utils from '../../lib/utils'
import setup from '../../lib/webgl/setup'
import {drawScene} from './draw-scene'
import {initBuffers} from './init-buffers'

import {frag} from './shaders/fragment-shader'
import {vert} from './shaders/vertex-shader-3d'

let gl
let programInfo
let buffers

function clear() {
	if (!gl) {
		// TODO: handle error
		return
	}
	gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientWidth)
	// Set the clear color to darkish green.
	gl.clearColor(0.0, 0.0, 0.0, 0.0)
	// Clear the context with the newly set color. This is
	// the function call that actually does the drawing.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

function main(canvas) {
	// Initialize the GL context
	gl = canvas.getContext('webgl2')

	// Only continue if WebGL is available and working
	if (gl === null) {
		alert('Unable to initialize WebGL. Your browser or machine may not support it.')
		return
	}

	clear()

	const vertexShader = setup.compile(gl, gl.VERTEX_SHADER, vert)
	const fragmentShader = setup.compile(gl, gl.FRAGMENT_SHADER, frag)

	let program
	if (vertexShader && fragmentShader) {
		program = setup.link(gl, vertexShader, fragmentShader)
		gl.useProgram(program)
	}

	utils.resize(canvas)
	// Collect all the info needed to use the shader program.
	// Look up which attribute our shader program is using
	// for aVertexPosition and look up uniform locations.
	programInfo = {
		program,
		attribLocations: {
			a_position: gl.getAttribLocation(program, 'a_position'),
			a_color: gl.getAttribLocation(program, 'a_color'),
		},
		uniformLocations: {
			// bind u_matrix
			u_matrix: gl.getUniformLocation(program, 'u_matrix'),
		},
		geometry: utils.getGeometryCamera3D(),
	}
	buffers = initBuffers(gl)
	return programInfo
}

function draw() {
	const vao = gl.createVertexArray()
	drawScene(gl, programInfo, buffers, vao)
}

function update(geometry) {
	programInfo.geometry = geometry
	buffers = initBuffers(gl, programInfo)
}

export default {main, draw, clear, update}
