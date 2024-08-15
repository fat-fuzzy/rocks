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

export default {modulePath, hashFilePath, hashFilePathTmp, signatureFilePath}
