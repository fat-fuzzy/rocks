import geometries from '../../lib/geometries'

const {DEFAULT_TEXTURE_COORDS} = geometries

//  {width, height} = programInfo.context
export function initBuffers(gl) {
	let positionBuffer = gl.createBuffer()
	let texCoordBuffer = gl.createBuffer()

	return {
		texCoordBuffer,
		positionBuffer,
	}
}
//  {width, height} = programInfo.context
export function updateBuffers(gl, programInfo, {texCoordBuffer, positionBuffer}) {
	const {width, height} = programInfo.context
	updateTextureBufferData(gl, texCoordBuffer)
	updatePositionBufferData(gl, positionBuffer, width, height)

	return {
		texCoordBuffer,
		positionBuffer,
	}
}

function updatePositionBufferData(gl, positionBuffer, width, height) {
	// Select positionBuffer as current buffer to use for buffer ops
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Create an array of positions for the geometry.
	const x1 = 0
	const x2 = width
	const y1 = 0
	const y2 = height
	// prettier-ignore
	const coords = [
			x1, y1,
			x2, y1,
			x1, y2,
			x1, y2,
			x2, y1,
			x2, y2,
		]
	// Pass the list of positions into WebGL to build the shape.
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW)
}

function updateTextureBufferData(gl, texCoordBuffer) {
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(DEFAULT_TEXTURE_COORDS), gl.STATIC_DRAW)
}
