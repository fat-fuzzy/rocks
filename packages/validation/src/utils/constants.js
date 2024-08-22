import path from 'path'

const outDir = './src/ajv/out'
const ajvValidate = 'validate.ajv.mjs'
const ajvHash = 'validate.ajv.mjs.hash'
const ajvHashTmp = 'validate.ajv.mjs.hash.tmp'
const ajvSigned = 'validate.ajv.mjs.hash.sig'

// Path to the compiled module and the hash file
const modulePath = path.join(outDir, ajvValidate)
const hashFilePath = path.join(outDir, ajvHash)
const hashFilePathTmp = path.join(outDir, ajvHashTmp)
const signatureFilePath = path.join(outDir, ajvSigned)

const PATHS = {modulePath, hashFilePath, hashFilePathTmp, signatureFilePath}

const PATTERNS = {
	USERNAME: '^([\\W\\D\\S]{0}[\\.\\-]{0,1000}[\\w\\d]{0,1000}){3,1000}$',
	PASSWORD_SPECIAL_CHARS: '([$\\-+!?*&%~_@#]{1}[a-z|A-Z|0-9]{0,100}){3}',
	PASSWORD_DIGITS: '([0-9]{1}[a-z|A-Z|0-9]{0,100}){3}',
	PHONE: '[\\+0-9]{10,14}',
}

export default {PATHS, PATTERNS}
