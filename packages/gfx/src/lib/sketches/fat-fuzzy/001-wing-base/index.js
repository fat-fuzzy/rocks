// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */
import dom from '../../../dom'
import props from '../props'
import setup from '../../../webgl/setup'
import {drawScene} from './draw-scene'
import {initBuffers} from '../../../webgl/buffers/geometry-2d'

import {frag} from './shaders/fragment-shader'
import {vert} from './shaders/vertex-shader-2d'
import wabiSabi from '../wings/index.js'

let gl
let program
let buffers
let vertexShader
let fragmentShader
let programInfo = {
	errors: [],
}
let error
let bgColor = [Math.random(), Math.random(), Math.random()]
let {WING, BONES, FEATHERS, COLORS} = props

// Initialize the wing here to maintain color across main calls
// TODO: chose color mode
let currentWing
let Wing

let meta = {
	project: 'fat-fuzzy',
	id: '001',
	slug: 'wing-base',
	title: 'Wing Base',
	asset: 'wing',
	// status: 'draft',
	categories: ['Projects'],
	tags: ['2D', 'webgl', 'matrix', 'wings'],
	controls: ['speed', 'color', 'grid', 'loop'],
	grid: ['base1', 'base2', 'base3'],
}

const wings = {
	base1: wabiSabi.base1,
	base2: wabiSabi.base2,
	base3: wabiSabi.base3,
}

function init(canvas) {
	// Initialize the GL context
	gl = canvas.getContext('webgl2', {preserveDrawingBuffer: true})

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
	bgColor = programInfo.context.background

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

	// Initial Wing
	Wing = wings.base1

	currentWing = new Wing({
		position: [0, 0],
		direction: WING.direction,
		step: WING.currentStep,
		layers: 1,
		steps: WING.steps,
		pause: WING.pause,
		bones: BONES,
		feathers: FEATHERS,
		colors: COLORS,
		drawFeathers: true,
		canvasWidth: canvas.width,
		canvasHeight: canvas.height,
	})

	currentWing.init(gl.canvas.width, gl.canvas.height)

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
			u_matrix: gl.getUniformLocation(program, 'u_matrix'),
		},
		context: currentWing.getGeometryCoords(),
		errors: [],
	}

	clear()

	buffers = initBuffers(gl, _programInfo)
	error = gl.getError()
	if (error !== gl.NO_ERROR) {
		_programInfo.errors.push(error)
	}
	return _programInfo
}

function draw() {
	update()
	drawScene(gl, programInfo, buffers)
}

function update(sceneContext) {
	if (sceneContext) {
		let {grid} = sceneContext
		if (grid && grid[0] !== currentWing.name) {
			Wing = wings[grid[0]]
			if (!Wing) {
				console.warn(`Wing ${grid[0]} not found`)
				return
			}

			clear()

			currentWing = new Wing({
				name: grid[0],
				position: [0, 0],
				direction: WING.direction,
				step: WING.currentStep,
				layers: 1,
				steps: WING.steps,
				pause: WING.pause,
				bones: BONES,
				feathers: FEATHERS,
				colors: COLORS,
				drawFeathers: true,
				canvasWidth: gl.canvas.width,
				canvasHeight: gl.canvas.height,
			})
		}
	}

	currentWing.init(gl.canvas.width, gl.canvas.height)
	currentWing.updateWingState()
	bgColor = currentWing.colorBg
	programInfo.context = currentWing.getGeometryCoords()
	buffers = initBuffers(gl, programInfo)
}

function clear() {
	if (!gl) {
		// TODO: handle error
		return
	}
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
	// Set the clear color to darkish green.
	gl.clearColor(...bgColor, 1.0)
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
	currentWing = null
}

export default {init, meta, main, draw, update, clear, stop}
