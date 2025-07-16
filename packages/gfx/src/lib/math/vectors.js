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

function getUnitVector(x, y, magnitude) {
	return [x / magnitude, y / magnitude]
}

function getMagnitudeFromCoords(x, y) {
	return Math.abs(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))
}

function getCoordsFromMagAndAngle(magnitude, angle) {
	const x = magnitude * Math.cos(angle)
	const y = magnitude * Math.sin(angle)
	return [x, y]
}

/*
 * (x, y) are the coordinates of the bone vector
 * distance is the lenght along the bone where we want to insert the feather
 * returns the coordinates of the insertion point: we want to translate the origin here
 */
function getIntersectionPoint(x, y, distance, magnitude) {
	let unit = getUnitVector(x, y, magnitude)
	return [distance * unit[0], distance * unit[1]]
}

export default {
	VECTOR,
	getUnitVector,
	getMagnitudeFromCoords,
	getCoordsFromMagAndAngle,
	getIntersectionPoint,
}
