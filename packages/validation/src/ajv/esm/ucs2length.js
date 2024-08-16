/**
 * See ./node-modules/ajv/dist/runtime/equal.js for the original implementation
 * Src: https://github.com/mathiasbynens/punycode.js
 * and: https://mathiasbynens.be/notes/javascript-encoding
 */
function ucs2length(str) {
	const len = str.length
	let length = 0
	let pos = 0
	let value
	while (pos < len) {
		length++
		value = str.charCodeAt(pos++)
		if (value >= 0xd800 && value <= 0xdbff && pos < len) {
			value = str.charCodeAt(pos)
			if ((value & 0xfc00) === 0xdc00) pos++
		}
	}
	return length
}

export default ucs2length
