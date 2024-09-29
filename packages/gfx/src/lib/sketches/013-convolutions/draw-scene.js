import dom from '../../dom'
import filters from '../../math/filters'

let originalTexture

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {*} programInfo
 * @param {*} buffers
 */
function drawScene(gl, programInfo, {level}) {
	// Pass in the canvas resolution to convert from pixels to clipspace in the shader
	gl.uniform2f(
		programInfo.uniformLocations.u_resolution,
		gl.canvas.width,
		gl.canvas.height,
	)
	gl.uniform1i(programInfo.uniformLocations.u_level, level)

	// Create a texture
	originalTexture = createAndSetupTexture(gl)

	// Upload the image into the texture
	let mipLevel = 0 // the largest mip
	let border = 0 // the largest mip
	let internalFormat = gl.RGBA // format we want in the texture
	let srcFormat = gl.RGBA // format of data we are supplying
	let srcType = gl.UNSIGNED_BYTE // type of data we are supplying
	let data = null // no data = create a black texture

	let framebufferOptions = {
		mipLevel,
		border,
		internalFormat,
		srcFormat,
		srcType,
		data,
	}
	// texImage2D(target, level, internalformat, format, type, source)
	const image = programInfo.context.image
	gl.texImage2D(
		gl.TEXTURE_2D,
		mipLevel,
		internalFormat,
		srcFormat,
		srcType,
		image,
	)

	let {textures, framebuffers} = setupFramebuffers(
		gl,
		programInfo,
		framebufferOptions,
	)

	drawEffects(gl, programInfo, textures, framebuffers, originalTexture)
}

function createAndSetupTexture(gl) {
	// Create a texture
	let texture = gl.createTexture()

	// Bind texture to 'texture unit 0' 2D bind point
	gl.bindTexture(gl.TEXTURE_2D, texture)

	// Set the parameters so we don't need mips (?):
	// - we're not filtering
	// - we don't repeat
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

	return texture
}

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {*} programInfo
 * @param {*} framebufferOptions
 */
function setupFramebuffers(gl, programInfo, framebufferOptions) {
	let textures = []
	let framebuffers = []
	let {mipLevel, border, internalFormat, srcFormat, srcType, data} =
		framebufferOptions

	for (let i = 0; i < filters.kernelKeys.length; i++) {
		// Create a texture
		let texture = createAndSetupTexture(gl)
		textures[i] = texture

		// texImage2D(target, level, internalformat, width, height, border, format, type, data)
		gl.texImage2D(
			gl.TEXTURE_2D,
			mipLevel,
			internalFormat,
			programInfo.context.image.width,
			programInfo.context.image.height,
			border,
			srcFormat,
			srcType,
			data,
		)

		// Create a framebuffer
		let fbo = gl.createFramebuffer()
		framebuffers.push(fbo)
		gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)

		// Attach a texture to it
		let attachmentPoint = gl.COLOR_ATTACHMENT0
		gl.framebufferTexture2D(
			gl.FRAMEBUFFER,
			attachmentPoint,
			gl.TEXTURE_2D,
			texture,
			mipLevel,
		)
	}

	return {textures, framebuffers}
}

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {*} programInfo
 * @param {*} textures
 * @param {*} framebuffers
 * @param {*} originalTexture
 */
function drawEffects(gl, programInfo, textures, framebuffers, originalTexture) {
	let contextFilters = programInfo.context.convolutions
	// start with the original image on unit 0
	gl.activeTexture(gl.TEXTURE0 + 0)
	gl.bindTexture(gl.TEXTURE_2D, originalTexture)

	// Tell the shader to get the texture from texture unit 0
	gl.uniform1i(programInfo.uniformLocations.u_image, 0)

	// Don't y-flip the image while you are drawing to the textures
	gl.uniform1f(programInfo.uniformLocations.u_flipY, 1)

	// Loop through each effect we want to apply
	let count = 0
	let kernel
	for (let i = 0; i < contextFilters.length; i++) {
		// Set the kernel and its weight
		kernel = contextFilters[i] ? filters.getKernel(contextFilters[i]) : null

		if (kernel) {
			// Set up to draw in one of the framebuffers
			setFrameBuffer(gl, framebuffers[count % 2], programInfo)

			draWithKernel(gl, programInfo, kernel)

			// for the next draw, use the texture we just rendered to
			gl.bindTexture(gl.TEXTURE_2D, textures[count % 2])

			// increment count so we use the other texture next time
			count++
		}
	}

	// NOW: y-flip the image to display on canvas
	gl.uniform1f(programInfo.uniformLocations.u_flipY, -1)

	setFrameBuffer(gl, null, programInfo)

	// Clear the canvas
	gl.clearColor(0, 0, 0, 0)
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	draWithKernel(gl, programInfo, filters.getKernel('normal'))
}

/**
 * Setup framebuffers to apply multiple effects to a texture
 * > There's a list of which types and combinations of attachments are supposed to always work.
 * > The one used here, one RGBA/UNSIGNED_BYTE texture assigned to the COLOR_ATTACHMENT0 attachment point, is always supposed to work.
 * > More exotic texture formats and or combinations of attachments might not work.b
 * > In that case you're supposed to bind the framebuffer and then call gl.checkFramebufferStatus and see if it returns gl.FRAMEBUFFER_COMPLETE
 * Source: https://webgl2fundamentals.org/webgl/lessons/webgl-image-processing-continued.htmls
 * @param {WebGL2RenderingContext} gl
 * @param {*} fbo
 * @param {*} programInfo
 */
function setFrameBuffer(gl, fbo, programInfo) {
	// make this the framebuffer we are rendering to
	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)

	// Tell the shader the resolution of the framebuffer
	gl.uniform2f(
		programInfo.uniformLocations.u_resolution,
		gl.canvas.width,
		gl.canvas.height,
	)

	let {x, y, viewportWidth, viewportHeight} = dom.centerImage(
		{width: gl.drawingBufferWidth, height: gl.drawingBufferHeight},
		gl.canvas,
	)
	// Tell WebGL how to convert from clip space to pixels
	gl.viewport(x, y, viewportWidth, viewportHeight)
}

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {*} programInfo
 * @param {*} kernel
 */
function draWithKernel(gl, programInfo, kernel) {
	// Set the kernel and its weight
	gl.uniform1fv(programInfo.uniformLocations.u_kernel, kernel)
	gl.uniform1f(
		programInfo.uniformLocations.u_kernelWeight,
		filters.computeKernelWeight(kernel),
	)

	// Set a rectangle the same dimensions as the image
	const primitiveType = gl.TRIANGLES
	const offset = 0
	const count = 6
	gl.drawArrays(primitiveType, offset, count)
}

export {drawScene}
