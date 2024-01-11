import geometries from '../../lib/geometries'

const {DEFAULT_TEXTURE_COORDS} = geometries

function initBuffers(gl, programInfo) {
	const {width, height} = programInfo.context

	const texCoordBuffer = initTextureBuffer(gl)
	const positionBuffer = initPositionBuffer(gl, {width, height})

	return {
		texture: texCoordBuffer,
		position: positionBuffer,
	}
}

function initPositionBuffer(gl, {width, height}) {
	// Create a buffer for the geometry's positions.
	const positionBuffer = gl.createBuffer()

	// Select positionBuffer as current buffer to use for buffer ops
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Create an array of positions for the geometry.
	const x1 = 0
	const x2 = 0 + width
	const y1 = 0
	const y2 = 0 + height
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

	return positionBuffer
}

function initTextureBuffer(gl) {
	const texCoordBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(DEFAULT_TEXTURE_COORDS), gl.STATIC_DRAW)

	return texCoordBuffer
}

export {initBuffers}
