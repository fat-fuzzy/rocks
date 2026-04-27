// ---------------------------------------------------------------------------
// Same AJV options and require() patches as generate.js — must stay in sync
// ---------------------------------------------------------------------------

const AJV_OPTIONS = {
	allErrors: true,
	$data: true,
	code: {source: true, esm: true},
}

/**
 * ---------------------------------------------------------------------------
 * Runtime patches for AJV ESM compatibility:
 * - AJV's standalone codegen emits require() calls for these two runtime helpers,
 *  even in ESM mode
 * - We inline the implementations so the output works in browser ESM contexts
 * See ISSUE: https://github.com/eclipsesource/jsonforms/issues/1498#issuecomment-1620136830
 */
const ucs2lengthReplacement = `function(str){const len=str.length;let length=0;let pos=0;let value;while (pos<len){length++;value=str.charCodeAt(pos++);if(value>=0xd800&&value<=0xdbff&&pos<len){value=str.charCodeAt(pos);if((value & 0xfc00)===0xdc00) pos++;}} return length;}`

const equalReplacement = `function r(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){if(e.constructor!==t.constructor)return!1;var f,n,i;if(Array.isArray(e)){if((f=e.length)!=t.length)return!1;for(n=f;0!=n--;)if(!r(e[n],t[n]))return!1;return!0}if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(n of e.entries())if(!t.has(n[0]))return!1;for(n of e.entries())if(!r(n[1],t.get(n[0])))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(n of e.entries())if(!t.has(n[0]))return!1;return!0}if(ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if((f=e.length)!=t.length)return!1;for(n=f;0!=n--;)if(e[n]!==t[n])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if((f=(i=Object.keys(e)).length)!==Object.keys(t).length)return!1;for(n=f;0!=n--;)if(!Object.prototype.hasOwnProperty.call(t,i[n]))return!1;for(n=f;0!=n--;){var o=i[n];if(!r(e[o],t[o]))return!1}return!0}return e!=e&&t!=t}`

const REPLACEMENTS = [
	{
		search: 'require("ajv/dist/runtime/ucs2length").default',
		replace: () => ucs2lengthReplacement,
	},
	{
		search: 'require("ajv/dist/runtime/equal").default',
		replace: () => equalReplacement,
	},
]

export default {
	AJV_OPTIONS,
	REPLACEMENTS,
}
