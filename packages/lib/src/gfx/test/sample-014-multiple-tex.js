'use strict'

var vertexShaderSource = `#version 300 es

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

var fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// our texture
uniform sampler2D u_image0;
uniform sampler2D u_image1;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  vec4 color0 = texture(u_image0, v_texCoord);
  vec4 color1 = texture(u_image1, v_texCoord);
  outColor = color0 * color1;
}
`

function loadImage(url, callback) {
	var image = new Image()
	image.src = url
	image.onload = callback
	return image
}

function loadImages(urls, callback) {
	var images = []
	var imagesToLoad = urls.length

	// Called each time an image finished
	// loading.
	var onImageLoad = function () {
		--imagesToLoad
		// If all the images are loaded call the callback.
		if (imagesToLoad === 0) {
			callback(images)
		}
	}

	for (var ii = 0; ii < imagesToLoad; ++ii) {
		var image = loadImage(urls[ii], onImageLoad)
		images.push(image)
	}
}

function main() {
	loadImages(
		[
			'https://webgl2fundamentals.org/webgl/resources/leaves.jpg',
			'https://webgl2fundamentals.org/webgl/resources/star.jpg',
		],
		render,
	)
}

function render(images) {
	// Get A WebGL context
	/** @type {HTMLCanvasElement} */
	var canvas = document.querySelector('#canvas')
	var gl = canvas.getContext('webgl2')
	if (!gl) {
		return
	}

	// setup GLSL program
	var program = webglUtils.createProgramFromSources(gl, [
		vertexShaderSource,
		fragmentShaderSource,
	])

	// look up where the vertex data needs to go.
	var positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
	var texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord')

	// lookup uniforms
	var resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
	var u_image0Location = gl.getUniformLocation(program, 'u_image0')
	var u_image1Location = gl.getUniformLocation(program, 'u_image1')

	// Create a vertex array object (attribute state)
	var vao = gl.createVertexArray()

	// and make it the one we're currently working with
	gl.bindVertexArray(vao)

	// Create a buffer and put a single pixel space rectangle in
	// it (2 triangles)
	var positionBuffer = gl.createBuffer()

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Turn on the attribute
	gl.enableVertexAttribArray(positionAttributeLocation)

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

	// Tell the attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
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

	// create 2 textures
	var textures = []
	for (var ii = 0; ii < 2; ++ii) {
		var texture = gl.createTexture()
		gl.bindTexture(gl.TEXTURE_2D, texture)

		// Set the parameters so we don't need mips
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
			images[ii],
		)

		// add the texture to the array of textures.
		textures.push(texture)
	}

	// Bind the position buffer so gl.bufferData that will be called
	// in setRectangle puts data in the position buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Set a rectangle the same size as the image.
	// Note: we're assuming both images are the same size.
	setRectangle(gl, 0, 0, images[0].width, images[0].height)

	webglUtils.resizeCanvasToDisplaySize(gl.canvas)

	// Tell WebGL how to convert from clip space to pixels
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

	// Clear the canvas
	gl.clearColor(0, 0, 0, 0)
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	// Tell it to use our program (pair of shaders)
	gl.useProgram(program)

	// Bind the attribute/buffer set we want.
	gl.bindVertexArray(vao)

	// set the resolution
	gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)

	// Tell the shader to get the texture from texture unit 0
	// set which texture units to render with.
	gl.uniform1i(u_image0Location, 0) // texture unit 0
	gl.uniform1i(u_image1Location, 1) // texture unit 1

	// Set each texture unit to use a particular texture.
	gl.activeTexture(gl.TEXTURE0)
	gl.bindTexture(gl.TEXTURE_2D, textures[0])
	gl.activeTexture(gl.TEXTURE1)
	gl.bindTexture(gl.TEXTURE_2D, textures[1])

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
