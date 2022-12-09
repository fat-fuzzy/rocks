// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */

import utils from '../../lib/utils'
import setup from '../../lib/webgl/setup'

import {frag} from './shaders/fragment-shader'
import {vert} from './shaders/vertex-shader'
class Sketch {
	#frag = frag
	#vert = vert

	constructor(canvas) {
		this.#init(canvas)
	}

	/**
	 * INITIALIZATION CODE
	 * Code that gets executed once before the program runs
	 * @param {HTMLCanvasElement} canvas
	 */
	#init(canvas) {
		// 1. Get A WebGL context
		console.log('---- Sketch - init canvas ------')
		console.log(canvas)
		const gl = canvas.getContext('webgl')

		if (!gl) {
			alert('Your browser does not support WebGL :(')
			return
		}
		this.gl = gl

		// 1. Setup canvas
		// - resize canvas to fit screen display
		utils.resize(canvas)

		this.maxWidth = canvas.getAttribute('width')
		this.maxHeight = canvas.getAttribute('height')

		// - tell WebGL how to covert clip space values for gl_Position back into screen space (pixels)
		// -> use gl.viewport
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

		this.vertexShader = setup.compile(gl, gl.VERTEX_SHADER, this.#vert)
		this.fragmentShader = setup.compile(gl, gl.FRAGMENT_SHADER, this.#frag)
		if (!this.vertexShader || !this.fragmentShader) {
			throw Error('Ran into a problem compiling shaders')
		}
		this.program = setup.link(gl, this.vertexShader, this.fragmentShader)
		if (!this.program) {
			throw Error('Ran into a problem compiling shaders')
		}
		this.gl.useProgram(this.program)

		// 2. Bind resources & data

		this.a_position = gl.getAttribLocation(this.program, 'a_position')

		// 3. Set up Uniforms (~ globals)
		//  - sets uniforms to be bound to the current program

		// bind u_color
		this.u_color = gl.getUniformLocation(this.program, 'u_color')
		// bind u_translation
		this.u_translation = gl.getUniformLocation(this.program, 'u_translation')
		// bind u_resolution
		this.u_resolution = gl.getUniformLocation(this.program, 'u_resolution')
		// bind u_rotation
		this.u_rotation = gl.getUniformLocation(this.program, 'u_rotation')
		// bind u_scale
		this.u_scale = gl.getUniformLocation(this.program, 'u_scale')

		// Create a buffer to put positions in
		this.positionBuffer = gl.createBuffer()

		// bind our resource (the positions buffer) to a BIND_POINT on the GPU
		// so that we can pass data to it
		// always set this up before rendering loop
		// (think of it as ARRAY_BUFFER = positionBuffer)
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
	}

	/**
	 * Write data to draw a rectangle into the last thing bound to gl.ARRAY_BUFFER (in this context positionBuffer)
	 * @param {WebGLRenderingContext} gl
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 * @param {number} width
	 * @param {number} height
	 */
	#setRectangle(x, y, width, height) {
		if (!this.gl) {
			return
		}
		const x1 = x
		const x2 = x + width
		const y1 = y
		const y2 = y + height
		// prettier-ignore
		const coords = [
			x1, y1,
			x2, y1,
			x1, y2,
			x1, y2,
			x2, y1,
			x2, y2,
		]
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(coords), this.gl.STATIC_DRAW)
	}

	#drawGeometry() {
		if (!this.gl || !this.u_color) {
			return
		}
		// Setup a random rectangle
		this.#setRectangle(
			utils.randomInt(this.maxWidth),
			utils.randomInt(this.maxHeight),
			utils.randomInt(this.maxWidth),
			utils.randomInt(this.maxHeight),
		)

		// Set a random color.
		this.gl.uniform4f(this.u_color, Math.random(), Math.random(), Math.random(), 1)

		// Draw the rectangle.
		// WebGL has 3 types of primitives: points, lines, and triangles
		// const primitiveType = this.gl.TRIANGLES // each iteration, WebGL will draw a triangle based on the values set in gl_Position
		// const count = 6 // number of times the shader will execute: 3
		// 1st Iteration: a_position.x & a_position.y of the vertex shader will be set to the first 2 values in the positionBuffer
		// 2nd Iteration: a_position.x & a_position.y => next pair of values of positionBuffer
		// 3rd Iteration: a_position.x & a_position.y => next (last) pair of values of positionBuffer
		// offset = 0
		// this.gl.drawArrays(primitiveType, offset, count)
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
	}

	/**
	 * @param {number} count number of rectangles to draw
	 */
	#drawGeometrySet(count) {
		for (let i = 0; i < count; ++i) {
			this.#drawGeometry()
		}
	}

	#render() {
		console.log('---- Sketch - draw ------')
		console.log('this.gl')
		console.log(this.gl)
		console.log('this.u_resolution')
		console.log(this.u_resolution)
		console.log('this.a_position')
		console.log(this.a_position)
		console.log('this.positionBuffer')
		console.log(this.positionBuffer)
		if (
			this.gl === undefined ||
			this.u_resolution === undefined ||
			this.a_position === undefined ||
			this.positionBuffer === undefined
		) {
			return
		}

		console.log('this.gl.canvas.width')
		console.log(this.gl.canvas.width)
		console.log('this.gl.canvas.height')
		console.log(this.gl.canvas.height)
		// set the resolution
		this.gl.uniform2f(this.u_resolution, this.gl.canvas.width, this.gl.canvas.height)

		// Clear the canvas
		this.gl.clearColor(0, 0, 0, 0) // set color to use as default when clearing buffer
		this.gl.clear(this.gl.COLOR_BUFFER_BIT)

		// 2. Bind Position
		// - Enable data supply into vertex shader a_position attribute
		this.gl.enableVertexAttribArray(this.a_position)
		// - Bind data retrieval to position buffer
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
		/**
		 *  Tell the a_position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		 * - vec4 a_position is a 4 float vector. We only need 2 values for 2D (points x,y)
		 * - default values are:  0, 0, 0, 1
		 * - we will set the first two (x, y), and the remaining two (z, w) will remain with default values (0,1)
		 */
		const size = 2 // 2 components per iteration
		const type = this.gl.FLOAT // the data is in 32bit floats
		const normalize = false // don't normalize the data
		const stride = 0 // 0: move forward (size * sizeof(type)) each iteration to get to the next position
		const offset = 0 // start at the beginning of the buffer
		this.gl.vertexAttribPointer(this.a_position, size, type, normalize, stride, offset)

		// this.#drawGeometrySet(1)
	}

	draw() {
		this.#render()
		this.#drawGeometrySet(1)
	}
	update(value) {
		// do nothing
	}

	clear() {
		if (!this.gl) {
			// TODO: handle error
			return
		}
		this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)
		// Set the clear color to darkish green.
		this.gl.clearColor(0.0, 0.0, 0.0, 0.0)
		// Clear the context with the newly set color. This is
		// the function call that actually does the drawing.
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
	}

	/**
	 * For debug: Helps to get references when shaders have many inputs
	 */
	reflect() {
		if (!this.gl || !this.program) {
			// TODO: handle error
			return
		}
		console.log('---- Sketch - reflect ------')
		const countAttributes = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES)
		const countUniforms = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS)
		const attributes = []
		const uniforms = []
		for (let i = 0; i < countAttributes; i++) {
			const attribute = this.gl.getActiveAttrib(this.program, i)
			if (attribute) {
				attributes.push(this.gl.getAttribLocation(this.program, attribute.name))
			}
		}
		for (let i = 0; i < countUniforms; i++) {
			const uniform = this.gl.getActiveUniform(this.program, i)
			if (uniform) {
				uniforms.push(this.gl.getUniformLocation(this.program, uniform.name))
			}
		}
		console.log('attributes')
		console.log(attributes)
		console.log('uniforms')
		console.log(uniforms)
		return {attributes, uniforms}
	}
}

export default Sketch
