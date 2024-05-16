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
import {vert} from './shaders/vertex-shader-2d'

let gl
let programInfo
let buffers

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

function main(canvas) {
	// Initialize the GL context
	gl = canvas.getContext('webgl')

	// Only continue if WebGL is available and working
	if (gl === null) {
		alert(
			'Unable to initialize WebGL. Your browser or machine may not support it.',
		)
		return
	}

	clear()

	const vertexShader = setup.compile(gl, gl.VERTEX_SHADER, vert)
	const fragmentShader = setup.compile(gl, gl.FRAGMENT_SHADER, frag)
	const program = setup.link(gl, vertexShader, fragmentShader)

	gl.useProgram(program)
	utils.resize(canvas)
	// Collect all the info needed to use the shader program.
	// Look up which attribute our shader program is using
	// for aVertexPosition and look up uniform locations.
	programInfo = {
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
		context: geometries.getGeometryRandom(
			canvas.clientWidth,
			canvas.clientHeight,
		),
	}
	buffers = initBuffers(gl, programInfo)
	return programInfo.context
}

function draw() {
	drawScene(gl, programInfo, buffers)
}

function update(context) {
	programInfo.context = context
	buffers = initBuffers(gl, programInfo)
}

export default {main, draw, clear, update}
