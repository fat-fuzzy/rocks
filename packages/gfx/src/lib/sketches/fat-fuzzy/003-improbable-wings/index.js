// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */
import dom from '../../../dom.js'
import props from '../props.js'
import setup from '../../../webgl/setup.js'
import {drawScene} from './draw-scene.js'
import {initBuffers} from '../../../webgl/buffers/geometry-2d.js'

import {frag} from './shaders/fragment-shader.js'
import {vert} from './shaders/vertex-shader-2d.js'
import improbableWings from './wings/index.js'

let gl
let program
let buffers
let vertexShader
let fragmentShader
let error
let programInfo = {
	errors: [],
}
let bgColor = [0.0298, 0.02089, 0.1233]
let {WING, BONES, FEATHERS, COLORS} = props

// Initialize the wing here to maintain color across main calls
// TODO: chose color mode
let currentWing
let Wing

let meta = {
	project: 'fat-fuzzy',
	id: '003',
	slug: 'improbable-wings',
	title: 'Improbable Wings',
	asset: 'phoenix',
	dimensions: 'square',
	// status: 'draft',
	categories: ['Projects'],
	tags: ['2D', 'webgl', 'matrix', 'sketches', 'wing'],
	controls: ['speed', 'color', 'grid', 'loop'],
	grid: [
		'xp1',
		'xp2',
		'xp3',
		'xp4',
		'xp5',
		'xp6',
		'xp7',
		'xp8',
		'xp9',
		'xp10',
		'xp11',
		'xp12',
		'xp13',
		'xp14',
		'xp15',
		'xp16',
		'xp17',
		// 'xp18',
		// 'xp19',
		// 'xp20',
		// 'xp21',
		// 'xp22',
		// 'xp23',
		// 'xp24',
		// 'xp25',
		// 'xp26',
		// 'xp27',
		// 'xp28',
		// 'xp29',
		// 'xp30',
		// 'xp31',
		// 'xp32',
	],
}

const wings = {
	xp1: improbableWings.xp1,
	xp2: improbableWings.xp2,
	xp3: improbableWings.xp3,
	xp4: improbableWings.xp4,
	xp5: improbableWings.xp5,
	xp6: improbableWings.xp6,
	xp7: improbableWings.xp7,
	xp8: improbableWings.xp8,
	xp9: improbableWings.xp9,
	xp10: improbableWings.xp10,
	xp11: improbableWings.xp11,
	xp12: improbableWings.xp12,
	xp13: improbableWings.xp13,
	xp14: improbableWings.xp14,
	xp15: improbableWings.xp15,
	xp16: improbableWings.xp16,
	xp17: improbableWings.xp17,
	xp18: improbableWings.xp18,
	xp19: improbableWings.xp19,
	xp20: improbableWings.xp20,
	xp21: improbableWings.xp21,
	xp22: improbableWings.xp22,
	xp23: improbableWings.xp23,
	xp24: improbableWings.xp24,
	xp25: improbableWings.xp25,
	xp26: improbableWings.xp26,
	xp27: improbableWings.xp27,
	xp28: improbableWings.xp28,
	xp29: improbableWings.xp29,
	xp30: improbableWings.xp30,
	xp31: improbableWings.xp31,
	xp32: improbableWings.xp32,
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
	Wing = wings['xp1']

	currentWing = new Wing({
		name: 'xp1',
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

	currentWing.init(canvas.width, canvas.height)

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
				canvasWidth: currentWing.width,
				canvasHeight: currentWing.height,
			})
		}
	}
	currentWing.updateWingState()
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
}

export default {init, meta, main, draw, update, clear, stop}
