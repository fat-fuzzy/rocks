const MATRICES_2D = {
	translate: function (m, tx, ty) {
		const m3 = this
		return m3.multiply(m, m3.translation(tx, ty))
	},
	rotate: function (m, angleInRadians) {
		const m3 = this
		return m3.multiply(m, m3.rotation(angleInRadians))
	},
	scale: function (m, sx, sy) {
		const m3 = this
		return m3.multiply(m, m3.scaling(sx, sy))
	},
	identity: function () {
		/* prettier-ignore */
		return [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		]
	},

	/**
	 * @param {*} a matrix A
	 * @param {*} b matrix B
	 * @returns matrix
	 */
	multiply: function (a, b) {
		var a00 = a[0 * 3 + 0]
		var a01 = a[0 * 3 + 1]
		var a02 = a[0 * 3 + 2]
		var a10 = a[1 * 3 + 0]
		var a11 = a[1 * 3 + 1]
		var a12 = a[1 * 3 + 2]
		var a20 = a[2 * 3 + 0]
		var a21 = a[2 * 3 + 1]
		var a22 = a[2 * 3 + 2]
		var b00 = b[0 * 3 + 0]
		var b01 = b[0 * 3 + 1]
		var b02 = b[0 * 3 + 2]
		var b10 = b[1 * 3 + 0]
		var b11 = b[1 * 3 + 1]
		var b12 = b[1 * 3 + 2]
		var b20 = b[2 * 3 + 0]
		var b21 = b[2 * 3 + 1]
		var b22 = b[2 * 3 + 2]

		return [
			b00 * a00 + b01 * a10 + b02 * a20,
			b00 * a01 + b01 * a11 + b02 * a21,
			b00 * a02 + b01 * a12 + b02 * a22,
			b10 * a00 + b11 * a10 + b12 * a20,
			b10 * a01 + b11 * a11 + b12 * a21,
			b10 * a02 + b11 * a12 + b12 * a22,
			b20 * a00 + b21 * a10 + b22 * a20,
			b20 * a01 + b21 * a11 + b22 * a21,
			b20 * a02 + b21 * a12 + b22 * a22,
		]
	},

	/**
	 * @param {number} tx translation X
	 * @param {number} ty translation Y
	 * @returns matrix
	 */
	translation: function (tx, ty) {
		/* prettier-ignore */
		return [
			1, 0, 0,
			0, 1, 0,
			tx, ty, 1,
		]
	},

	/**
	 * @param {number} angleInRadians
	 * @returns matrix
	 */
	rotation: function (angleInRadians) {
		const c = Math.cos(angleInRadians)
		const s = Math.sin(angleInRadians)

		/* prettier-ignore */
		return [
			c, -s, 0,
			s, c, 0,
			0, 0, 1,
		]
	},

	/**
	 * @param {number} sx scale X
	 * @param {number} sy scale Y
	 * @returns matrix
	 */
	scaling: function (sx, sy) {
		/* prettier-ignore */
		return [
			sx, 0, 0,
			0, sy, 0,
			0, 0, 1,
		]
	},

	/**
	 * The projection matrix scales the width and height to clip space and flips the Y axis so that 0 is at the top
	 * @param {number} width
	 * @param {number} height
	 * @returns matrix
	 */
	projection: function (width, height) {
		/* prettier-ignore */
		return [
			2 / width, 0, 0,
			0, -2 / height, 0,
			-1, 1, 1,
		]
	},
}

export default {
	MATRICES_2D,
}
