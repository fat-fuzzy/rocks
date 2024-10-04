/**
 * Canvas, like Images, has 2 sizes
 * - Size the canvas is displayed: set with CSS
 * - Number of pixels displayed inside the canvas
 * @param {number} range
 */
function randomInt(range) {
	return Math.floor(Math.random() * range)
}

function isPowerOf2(value) {
	return (value & (value - 1)) === 0
}

/**
 *
 * @param {*} characters
 */
function multiply(characters) {
	return new Array(100) // code from Svelte tutorial confetti
		.fill(0)
		.map((_, i) => {
			return {
				class: 'hide:rm-block',
				character: characters[i % characters.length],
				x: Math.random() * 100,
				y: -10 - Math.random() * 100,
				ratio: 0.1 + Math.random() * 1,
			}
		})
		.sort((a, b) => a.ratio - b.ratio)
}

/**
 * @param {number} degrees
 * @returns number
 */
function degToRad(degrees) {
	return degrees * (Math.PI / 180)
}

/**
 * @param {number} rads
 * @returns number
 */
function radToDeg(rads) {
	return (rads * Math.PI) / 180
}

/**
 * @param {number} n
 * @param {number} decimals
 * @returns number
 */
function round(n, decimals) {
	return Number(Math.round(Number(n + 'e' + decimals)) + 'e-' + decimals)
}
/**
 *
 * @param {number} beginning
 * @param {number} end
 * @param {number} t
 * @returns
 */
function interpolate(beginning, end, t) {
	return beginning + (end - beginning) * t
}

/**
 *
 * @param {number[]} beginValues
 * @param {number[]} endValues
 * @param {number} steps
 * @returns
 */
function normalizeAndInterpolate(beginValues, endValues, steps) {
	const result = []

	for (let i = 0; i <= steps; i++) {
		// `t` gives a value between 0 and 1 used to normalize (= place) the point for which we want to calculate a value (= draw)
		const t = i / steps

		const interpolated = beginValues.map((begin, index) =>
			interpolate(begin, endValues[index], t),
		)

		result.push(interpolated)
	}

	return result
}

function normalizeAngleDeg(angle) {
	return ((angle % 360) + 360) % 360
}

export default {
	randomInt,
	multiply,
	degToRad,
	radToDeg,
	isPowerOf2,
	round,
	interpolate,
	normalizeAndInterpolate,
	normalizeAngleDeg,
}
