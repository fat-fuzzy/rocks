/**
 ***********************
 * WebGL HELPER FUNCTIONS (setup)
 ***********************
 */
/**
 * Compile shader. Usage:
 * - compile(gl, gl.VERTEX_SHADER, vertexShaderSrc);
 * - compile(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
 * @param {WebGLRenderingContext} gl
 * @param {number} type
 * @param {string} source
 */
function compile(gl, type, source) {
	const shader = gl.createShader(type)
	if (shader) {
		gl.shaderSource(shader, source)
		gl.compileShader(shader)
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			const log = gl.getShaderInfoLog(shader)
			throw new Error(log ?? 'Error compiling shader')
		}
	}
	return shader
}

/**
 * Link shaders to WebGL rendering context. Usage:
 * - var program = link(gl, vertexShader, fragmentShader);
 * - gl.useProgram(program);
 * A 3D application may use more than one gl program.
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 */
function link(gl, vertexShader, fragmentShader) {
	const program = gl.createProgram()
	if (program) {
		gl.attachShader(program, vertexShader)
		gl.attachShader(program, fragmentShader)
		gl.linkProgram(program)
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			const log = gl.getProgramInfoLog(program)
			gl.deleteProgram(program)
			throw new Error(log ?? 'Error linking program')
		}
	}
	return program
}

/**
 * Canvas, like Images, has 2 sizes
 * - Size the canvas is displayed: set with CSS
 * - Number of pixels displayed inside the canvas
 * @param {HTMLCanvasElement} canvas
 */
function resize(canvas) {
	// Get the size that the browser is displaying the canvas
	const displayWidth = canvas.clientWidth
	const displayHeight = canvas.clientHeight

	// Check if the canvas is the same size
	if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
		// If not, make it the same
		canvas.width = displayWidth
		canvas.height = displayHeight
	}
}

var vert = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
in vec2 a_texCoord;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

// Used to pass the texture coordinates to the fragment shader
out vec2 v_texCoord;

// all shaders have a main function
void main() {

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

  // pass the texCoord to the fragment shader
  // The GPU will interpolate this value between points.
  v_texCoord = a_texCoord;
}
`

var frag = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = texture(u_image, v_texCoord);
}
`

function main() {
	var image = new Image()
	image.src = 'http://localhost:8000/plants.png' // MUST BE SAME DOMAIN!!!
	image.onload = function () {
		requestAnimationFrame(() => {
			render(image)
		})
	}
}

function render(image) {
	// Get A WebGL context
	/** @type {HTMLCanvasElement} */
	var canvas = document.querySelector('#canvas')
	var gl = canvas.getContext('webgl2')
	if (!gl) {
		return
	}

	// setup GLSL program
	let program
	const vertexShader = compile(gl, gl.VERTEX_SHADER, vert)
	const fragmentShader = compile(gl, gl.FRAGMENT_SHADER, frag)

	if (vertexShader && fragmentShader) {
		program = link(gl, vertexShader, fragmentShader)
		gl.useProgram(program)
	}

	// look up where the vertex data needs to go.
	var positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
	var texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord')

	// lookup uniforms
	var resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
	var imageLocation = gl.getUniformLocation(program, 'u_image')

	// Create a vertex array object (attribute state)
	var vao = gl.createVertexArray()

	// and make it the one we're currently working with
	gl.bindVertexArray(vao)

	// Create a buffer and put a single pixel space rectangle in
	// it (2 triangles)
	var positionBuffer = gl.createBuffer()

	// Turn on the attribute
	gl.enableVertexAttribArray(positionAttributeLocation)

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	var size = 2 // 2 components per iteration
	var type = gl.FLOAT // the data is 32bit floats
	var normalize = false // don't normalize the data
	var stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
	var offset = 0 // start at the beginning of the buffer
	gl.vertexAttribPointer(
		positionAttributeLocation,
		size,
		type,
		normalize,
		stride,
		offset,
	)

	// provide texture coordinates for the rectangle.
	var texCoordBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
			0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
		]),
		gl.STATIC_DRAW,
	)

	// Turn on the attribute
	gl.enableVertexAttribArray(texCoordAttributeLocation)

	// Tell the attribute how to get data out of texCoordBuffer (ARRAY_BUFFER)
	var size = 2 // 2 components per iteration
	var type = gl.FLOAT // the data is 32bit floats
	var normalize = false // don't normalize the data
	var stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
	var offset = 0 // start at the beginning of the buffer
	gl.vertexAttribPointer(
		texCoordAttributeLocation,
		size,
		type,
		normalize,
		stride,
		offset,
	)

	// Create a texture.
	var texture = gl.createTexture()

	// make unit 0 the active texture uint
	// (ie, the unit all other texture commands will affect
	gl.activeTexture(gl.TEXTURE0 + 0)

	// Bind it to texture unit 0' 2D bind point
	gl.bindTexture(gl.TEXTURE_2D, texture)

	// Set the parameters so we don't need mips and so we're not filtering
	// and we don't repeat at the edges
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

	// Upload the image into the texture.
	var mipLevel = 0 // the largest mip
	var internalFormat = gl.RGBA // format we want in the texture
	var srcFormat = gl.RGBA // format of data we are supplying
	var srcType = gl.UNSIGNED_BYTE // type of data we are supplying
	gl.texImage2D(
		gl.TEXTURE_2D,
		mipLevel,
		internalFormat,
		srcFormat,
		srcType,
		image,
	)

	resize(gl.canvas)

	// Tell WebGL how to convert from clip space to pixels
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

	// Clear the canvas
	gl.clearColor(0, 0, 0, 0)
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	// Tell it to use our program (pair of shaders)
	gl.useProgram(program)

	// Bind the attribute/buffer set we want.
	gl.bindVertexArray(vao)

	// Pass in the canvas resolution so we can convert from
	// pixels to clipspace in the shader
	gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)

	// Tell the shader to get the texture from texture unit 0
	gl.uniform1i(imageLocation, 0)

	// Bind the position buffer so gl.bufferData that will be called
	// in setRectangle puts data in the position buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Set a rectangle the same size as the image.
	setRectangle(gl, 0, 0, image.width, image.height)

	// Draw the rectangle.
	var primitiveType = gl.TRIANGLES
	var offset = 0
	var count = 6
	gl.drawArrays(primitiveType, offset, count)
}

function setRectangle(gl, x, y, width, height) {
	var x1 = x
	var x2 = x + width
	var y1 = y
	var y2 = y + height
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
		gl.STATIC_DRAW,
	)
}

main()
