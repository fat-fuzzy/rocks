const VECTOR = {
	cross: function (a, b) {
		/* prettier-ignore */
		return [
			a[1] * b[2] - a[2] * b[1],
			a[2] * b[0] - a[0] * b[2],
			a[0] * b[1] - a[1] * b[0],
		]
	},

	subtract: function (a, b) {
		return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
	},

	normalize: function (v) {
		let length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
		// Prevent division by ~ 0
		if (length > 0.0001) {
			return [v[0] / length, v[1] / length, v[2] / length]
		} else {
			return [0, 0, 0]
		}
	},
}

export default {
	VECTOR,
}
