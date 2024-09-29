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

export default {
	compile,
	link,
}
