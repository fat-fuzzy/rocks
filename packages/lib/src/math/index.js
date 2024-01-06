/**
 * Utility functions
 */
// Returns a random integer from 0 to range - 1.
function randomInt(range) {
	return Math.floor(Math.random() * range)
}
/**
 *
 * @param {*} characters
 */
function multiplyChars(characters) {
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

function degToRad(degrees) {
	return degrees * (Math.PI / 180)
}

function round(n, decimals) {
	return Number(Math.round(n + 'e' + decimals) + 'e-' + decimals)
}

const utils = {
	randomInt,
	multiplyChars,
	degToRad,
	round,
}

export default {
	utils,
}
