import vectors from './vectors'

const {VECTOR} = vectors

/**
 * Based on exercises in https://webgl2fundamentals.org
 *
 * On naming, see:
 * https://webgl2fundamentals.org/webgl/lessons/webgl-matrix-naming.html
 */
const M3 = {
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
	shear: function () {
		/* prettier-ignore */
		return [
			1, 1, 0,
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

const M4 = {
	translate: function (m, tx, ty, tz) {
		const m4 = this
		return m4.multiply(m, m4.translation(tx, ty, tz))
	},
	xRotate: function (m, angleInRadians) {
		const m4 = this
		return m4.multiply(m, m4.xRotation(angleInRadians))
	},
	yRotate: function (m, angleInRadians) {
		const m4 = this
		return m4.multiply(m, m4.yRotation(angleInRadians))
	},
	zRotate: function (m, angleInRadians) {
		const m4 = this
		return m4.multiply(m, m4.zRotation(angleInRadians))
	},
	scale: function (m, sx, sy, sz) {
		const m4 = this
		return m4.multiply(m, m4.scaling(sx, sy, sz))
	},
	identity: function () {
		/* prettier-ignore */
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]
	},

	/**
	 * @param {*} a matrix A
	 * @param {*} b matrix B
	 * @returns matrix
	 */
	multiply: function (a, b) {
		var b00 = b[0 * 4 + 0]
		var b01 = b[0 * 4 + 1]
		var b02 = b[0 * 4 + 2]
		var b03 = b[0 * 4 + 3]
		var b10 = b[1 * 4 + 0]
		var b11 = b[1 * 4 + 1]
		var b12 = b[1 * 4 + 2]
		var b13 = b[1 * 4 + 3]
		var b20 = b[2 * 4 + 0]
		var b21 = b[2 * 4 + 1]
		var b22 = b[2 * 4 + 2]
		var b23 = b[2 * 4 + 3]
		var b30 = b[3 * 4 + 0]
		var b31 = b[3 * 4 + 1]
		var b32 = b[3 * 4 + 2]
		var b33 = b[3 * 4 + 3]
		var a00 = a[0 * 4 + 0]
		var a01 = a[0 * 4 + 1]
		var a02 = a[0 * 4 + 2]
		var a03 = a[0 * 4 + 3]
		var a10 = a[1 * 4 + 0]
		var a11 = a[1 * 4 + 1]
		var a12 = a[1 * 4 + 2]
		var a13 = a[1 * 4 + 3]
		var a20 = a[2 * 4 + 0]
		var a21 = a[2 * 4 + 1]
		var a22 = a[2 * 4 + 2]
		var a23 = a[2 * 4 + 3]
		var a30 = a[3 * 4 + 0]
		var a31 = a[3 * 4 + 1]
		var a32 = a[3 * 4 + 2]
		var a33 = a[3 * 4 + 3]

		return [
			b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
			b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
			b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
			b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
			b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
			b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
			b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
			b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
			b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
			b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
			b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
			b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
			b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
			b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
			b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
			b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
		]
	},

	/**
	 * @param {number} tx translation X
	 * @param {number} ty translation Y
	 * @param {number} tz translation Z
	 * @returns matrix
	 */
	translation: function (tx, ty, tz) {
		/* prettier-ignore */
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			tx, ty, tz, 1,
		]
	},

	/**
	 * @param {number} angleInRadians
	 * @returns matrix
	 */
	xRotation: function (angleInRadians) {
		const c = Math.cos(angleInRadians)
		const s = Math.sin(angleInRadians)

		/* prettier-ignore */
		return [
			1, 0, 0, 0,
			0, c, s, 0,
			0,-s, c, 0,
			0, 0, 0, 1,
		]
	},

	/**
	 * @param {number} angleInRadians
	 * @returns matrix
	 */
	yRotation: function (angleInRadians) {
		const c = Math.cos(angleInRadians)
		const s = Math.sin(angleInRadians)

		/* prettier-ignore */
		return [
			c, 0,-s, 0,
			0, 1, 0, 0,
			s, 0, c, 0,
			0, 0, 0, 1,
		]
	},

	/**
	 * @param {number} angleInRadians
	 * @returns matrix
	 */
	zRotation: function (angleInRadians) {
		const c = Math.cos(angleInRadians)
		const s = Math.sin(angleInRadians)

		/* prettier-ignore */
		return [
			c, s, 0, 0,
		 -s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]
	},

	/**
	 * @param {number} sx scale X
	 * @param {number} sy scale Y
	 * @param {number} sz scale Z
	 * @returns matrix
	 */
	scaling: function (sx, sy, sz) {
		/* prettier-ignore */
		return [
			sx, 0,  0, 0,
			0, sy,  0, 0,
			0,  0, sz, 0,
			0,  0,  0, 1,

		]
	},

	shear: function () {
		/* prettier-ignore */
		return [
			1, 1, 1, 0,
			0, 1, 1, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]
	},

	/**
	 * The projection matrix scales the width and height to clip space and flips the Y axis so that 0 is at the top
	 * @param {number} width
	 * @param {number} height
	 * @param {number} depth
	 * @returns matrix
	 */
	projection: function (width, height, depth) {
		/* prettier-ignore */
		return [
			2 / width, 0, 0, 0,
			0, -2 / height, 0, 0,
			0, 0, 2 / depth, 0,
			-1, 1, 0, 1,
		]
	},

	orthographic: function (left, right, bottom, top, near, far) {
		/* prettier-ignore */
		return [
			2 / (right - left), 0, 0, 0,
			0, 2 / (top - bottom), 0, 0,
			0, 0, 2 / (near - far), 0,

			(left + right) / (left - right),
			(bottom + top) / (bottom - top),
			(near + far) / (near - far),
			1,
		]
	},

	makeZToWMatrix: function (fudgeFactor) {
		/* prettier-ignore */
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, fudgeFactor,
			0, 0, 0, 1,
		]
	},

	/**
	 *  Assumes there is a camera at the origin (0,0,0)
	 * @param {*} fieldOfViewInRadians
	 * @param {*} aspect
	 * @param {*} near
	 * @param {*} far
	 * @returns geometry projection in clip space
	 */
	perspective: function (fieldOfViewInRadians, aspect, near, far) {
		let f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians)
		let rangeInv = 1.0 / (near - far)

		/* prettier-ignore */
		return [
			f/aspect, 0, 0, 0,
			0, f, 0, 0,
			0, 0, (near + far) * rangeInv, -1,
			0, 0, near * far * rangeInv * 2, 0,
		]
	},

	/**
	 * Apply the inverse matrix * cameraMatrix to obtain a viewMatrix
	 * @param {*} m
	 * @returns
	 */
	inverse: function (m) {
		var m00 = m[0 * 4 + 0]
		var m01 = m[0 * 4 + 1]
		var m02 = m[0 * 4 + 2]
		var m03 = m[0 * 4 + 3]
		var m10 = m[1 * 4 + 0]
		var m11 = m[1 * 4 + 1]
		var m12 = m[1 * 4 + 2]
		var m13 = m[1 * 4 + 3]
		var m20 = m[2 * 4 + 0]
		var m21 = m[2 * 4 + 1]
		var m22 = m[2 * 4 + 2]
		var m23 = m[2 * 4 + 3]
		var m30 = m[3 * 4 + 0]
		var m31 = m[3 * 4 + 1]
		var m32 = m[3 * 4 + 2]
		var m33 = m[3 * 4 + 3]
		var tmp_0 = m22 * m33
		var tmp_1 = m32 * m23
		var tmp_2 = m12 * m33
		var tmp_3 = m32 * m13
		var tmp_4 = m12 * m23
		var tmp_5 = m22 * m13
		var tmp_6 = m02 * m33
		var tmp_7 = m32 * m03
		var tmp_8 = m02 * m23
		var tmp_9 = m22 * m03
		var tmp_10 = m02 * m13
		var tmp_11 = m12 * m03
		var tmp_12 = m20 * m31
		var tmp_13 = m30 * m21
		var tmp_14 = m10 * m31
		var tmp_15 = m30 * m11
		var tmp_16 = m10 * m21
		var tmp_17 = m20 * m11
		var tmp_18 = m00 * m31
		var tmp_19 = m30 * m01
		var tmp_20 = m00 * m21
		var tmp_21 = m20 * m01
		var tmp_22 = m00 * m11
		var tmp_23 = m10 * m01

		/* prettier-ignore */
		var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
             (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
		/* prettier-ignore */
		var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
             (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
		/* prettier-ignore */
		var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
             (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
		/* prettier-ignore */
		var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
             (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

		var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3)

		/* prettier-ignore */
		return [
      d * t0,
      d * t1,
      d * t2,
      d * t3,
      d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
           (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
      d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
           (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
      d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
           (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
      d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
           (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
      d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
           (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
      d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
           (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
      d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
           (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
      d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
           (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
      d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
           (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
      d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
           (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
      d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
           (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
      d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
           (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
    ];
	},

	transformVector: function (m, v) {
		var dst = []
		for (var i = 0; i < 4; ++i) {
			dst[i] = 0.0
			for (var j = 0; j < 4; ++j) {
				dst[i] += v[j] * m[j * 4 + i]
			}
		}
		return dst
	},

	lookAt: function (cameraPosition, target, up) {
		let zAxis = VECTOR.normalize(VECTOR.subtract(cameraPosition, target))
		let xAxis = VECTOR.normalize(VECTOR.cross(up, zAxis))
		let yAxis = VECTOR.normalize(VECTOR.cross(zAxis, xAxis))

		/* prettier-ignore */
		return [
			xAxis[0], xAxis[1], xAxis[2], 0,
			yAxis[0], yAxis[1], yAxis[2], 0,
			zAxis[0], zAxis[1], zAxis[2], 0,
			cameraPosition[0],
			cameraPosition[1],
			cameraPosition[2],
			1
		]
	},

	// Src: https://github.com/greggman/twgl.js/blob/main/src/m4.js
	transformPoint(m, v, dst) {
		dst = dst || new Float32Array()
		const v0 = v[0]
		const v1 = v[1]
		const v2 = v[2]
		const d =
			v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3]

		dst[0] =
			(v0 * m[0 * 4 + 0] +
				v1 * m[1 * 4 + 0] +
				v2 * m[2 * 4 + 0] +
				m[3 * 4 + 0]) /
			d
		dst[1] =
			(v0 * m[0 * 4 + 1] +
				v1 * m[1 * 4 + 1] +
				v2 * m[2 * 4 + 1] +
				m[3 * 4 + 1]) /
			d
		dst[2] =
			(v0 * m[0 * 4 + 2] +
				v1 * m[1 * 4 + 2] +
				v2 * m[2 * 4 + 2] +
				m[3 * 4 + 2]) /
			d

		return dst
	},
}

export default {
	M3,
	M4,
}
