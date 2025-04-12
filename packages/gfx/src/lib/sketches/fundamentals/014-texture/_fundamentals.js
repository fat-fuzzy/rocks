// WebGL2 - 3D Textures
// from https://webgl2fundamentals.org/webgl/webgl-3d-textures.html

'use strict'

var vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
in vec2 a_texcoord;

// A matrix to transform the positions by
uniform mat4 u_matrix;

// a varying to pass the texture coordinates to the fragment shader
out vec2 v_texcoord;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  gl_Position = u_matrix * a_position;

  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
`

var fragmentShaderSource = `#version 300 es

precision highp float;

// Passed in from the vertex shader.
in vec2 v_texcoord;

// The texture.
uniform sampler2D u_texture;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = texture(u_texture, v_texcoord);
}
`

function main() {
	// Get A WebGL context
	/** @type {HTMLCanvasElement} */
	var canvas = document.querySelector('#canvas')
	var gl = canvas.getContext('webgl2')
	if (!gl) {
		return
	}

	// Use our boilerplate utils to compile the shaders and link into a program
	var program = webglUtils.createProgramFromSources(gl, [
		vertexShaderSource,
		fragmentShaderSource,
	])

	// look up where the vertex data needs to go.
	var positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
	var texcoordAttributeLocation = gl.getAttribLocation(program, 'a_texcoord')

	// look up uniform locations
	var matrixLocation = gl.getUniformLocation(program, 'u_matrix')

	// Create a buffer
	var positionBuffer = gl.createBuffer()

	// Create a vertex array object (attribute state)
	var vao = gl.createVertexArray()

	// and make it the one we're currently working with
	gl.bindVertexArray(vao)

	// Turn on the attribute
	gl.enableVertexAttribArray(positionAttributeLocation)

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
	// Set Geometry.
	setGeometry(gl)

	// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	var size = 3 // 3 components per iteration
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

	// create the texcoord buffer, make it the current ARRAY_BUFFER
	// and copy in the texcoord values
	var texcoordBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
	setTexcoords(gl)

	// Turn on the attribute
	gl.enableVertexAttribArray(texcoordAttributeLocation)

	// Tell the attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
	var size = 2 // 2 components per iteration
	var type = gl.FLOAT // the data is 32bit floating point values
	var normalize = true // convert from 0-255 to 0.0-1.0
	var stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next color
	var offset = 0 // start at the beginning of the buffer
	gl.vertexAttribPointer(
		texcoordAttributeLocation,
		size,
		type,
		normalize,
		stride,
		offset,
	)

	// Create a texture.
	var texture = gl.createTexture()

	// use texture unit 0
	gl.activeTexture(gl.TEXTURE0 + 0)

	// bind to the TEXTURE_2D bind point of texture unit 0
	gl.bindTexture(gl.TEXTURE_2D, texture)

	// Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		1,
		1,
		0,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		new Uint8Array([0, 0, 255, 255]),
	)

	// Asynchronously load an image
	var image = new Image()
	requestCORSIfNotSameOrigin(
		image,
		'https://webgl2fundamentals.org/webgl/resources/f-texture.png',
	)
	image.src = 'https://webgl2fundamentals.org/webgl/resources/f-texture.png'
	image.addEventListener('load', function () {
		// Now that the image has loaded make copy it to the texture.
		gl.bindTexture(gl.TEXTURE_2D, texture)
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
		gl.generateMipmap(gl.TEXTURE_2D)
	})

	function degToRad(d) {
		return (d * Math.PI) / 180
	}

	// First let's make some variables
	// to hold the translation,
	var fieldOfViewRadians = degToRad(60)
	var modelXRotationRadians = degToRad(0)
	var modelYRotationRadians = degToRad(0)

	var then = 0

	requestAnimationFrame(drawScene)

	// Draw the scene.
	function drawScene(now) {
		// Convert to seconds
		now *= 0.001
		// Subtract the previous time from the current time
		var deltaTime = now - then
		// Remember the current time for the next frame.
		then = now

		webglUtils.resizeCanvasToDisplaySize(gl.canvas)

		// Animate the rotation
		modelXRotationRadians += 1.2 * deltaTime
		modelYRotationRadians += 0.7 * deltaTime

		// Tell WebGL how to convert from clip space to pixels
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

		// Clear the canvas
		gl.clearColor(0, 0, 0, 0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

		// turn on depth testing
		gl.enable(gl.DEPTH_TEST)

		// tell webgl to cull faces
		gl.enable(gl.CULL_FACE)

		// Tell it to use our program (pair of shaders)
		gl.useProgram(program)

		// Bind the attribute/buffer set we want.
		gl.bindVertexArray(vao)

		// Compute the matrix
		var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
		var zNear = 1
		var zFar = 2000
		var projectionMatrix = m4.perspective(
			fieldOfViewRadians,
			aspect,
			zNear,
			zFar,
		)

		var cameraPosition = [0, 0, 200]
		var up = [0, 1, 0]
		var target = [0, 0, 0]

		// Compute the camera's matrix using look at.
		var cameraMatrix = m4.lookAt(cameraPosition, target, up)

		// Make a view matrix from the camera matrix.
		var viewMatrix = m4.inverse(cameraMatrix)

		var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

		var matrix = m4.xRotate(viewProjectionMatrix, modelXRotationRadians)
		matrix = m4.yRotate(matrix, modelYRotationRadians)

		// Set the matrix.
		gl.uniformMatrix4fv(matrixLocation, false, matrix)

		// Draw the geometry.
		var primitiveType = gl.TRIANGLES
		var offset = 0
		var count = 16 * 6
		gl.drawArrays(primitiveType, offset, count)

		// Call drawScene again next frame
		requestAnimationFrame(drawScene)
	}
}

// Fill the current ARRAY_BUFFER buffer
// with the values that define a letter 'F'.
function setGeometry(gl) {
	var positions = new Float32Array([
		// left column front
		0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0,

		// top rung front
		30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0,

		// middle rung front
		30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0,

		// left column back
		0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30,

		// top rung back
		30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30,

		// middle rung back
		30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30,

		// top
		0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30,

		// top rung right
		100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30,

		// under top rung
		30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0,

		// between top rung and middle
		30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30,

		// top of middle rung
		30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30,

		// right of middle rung
		67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30,

		// bottom of middle rung.
		30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0,

		// right of bottom
		30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150, 30,

		// bottom
		0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0,

		// left side
		0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0,
	])

	// Center the F around the origin and Flip it around. We do this because
	// we're in 3D now with and +Y is up where as before when we started with 2D
	// we had +Y as down.

	// We could do by changing all the values above but I'm lazy.
	// We could also do it with a matrix at draw time but you should
	// never do stuff at draw time if you can do it at init time.
	var matrix = m4.translate(m4.xRotation(Math.PI), -50, -75, -15)
	//var matrix = m4.xRotate(m4.translation(-50, -75, -15), Math.PI);

	for (var ii = 0; ii < positions.length; ii += 3) {
		var vector = m4.transformPoint(matrix, [
			positions[ii + 0],
			positions[ii + 1],
			positions[ii + 2],
			1,
		])
		positions[ii + 0] = vector[0]
		positions[ii + 1] = vector[1]
		positions[ii + 2] = vector[2]
	}

	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
}

// Fill the current ARRAY_BUFFER buffer
// with texture coordinates for the letter 'F'.
function setTexcoords(gl) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
			// left column front
			0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

			// top rung front
			0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

			// middle rung front
			0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

			// left column back
			0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,

			// top rung back
			0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,

			// middle rung back
			0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1,

			// top
			0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1,

			// top rung right
			0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1,

			// under top rung
			0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,

			// between top rung and middle
			0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,

			// top of middle rung
			0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,

			// right of middle rung
			0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,

			// bottom of middle rung.
			0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,

			// right of bottom
			0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,

			// bottom
			0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,

			// left side
			0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
		]),
		gl.STATIC_DRAW,
	)
}

main()

// This is needed if the images are not on the same domain
// NOTE: The server providing the images must give CORS permissions
// in order to be able to use the image with WebGL. Most sites
// do NOT give permission.
// See: http://webgl2fundamentals.org/webgl/lessons/webgl-cors-permission.html
function requestCORSIfNotSameOrigin(img, url) {
	if (new URL(url, window.location.href).origin !== window.location.origin) {
		img.crossOrigin = ''
	}
}
