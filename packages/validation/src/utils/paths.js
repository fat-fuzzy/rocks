const outDir = './src/ajv/out'
const ajvValidate = 'validate.ajv.mjs'
const routing = 'Namespaces.ts'
const ajvHash = 'validate.ajv.mjs.hash'
const ajvHashTmp = 'validate.ajv.mjs.hash.tmp'
const ajvSigned = 'validate.ajv.mjs.hash.sig'

// Path to the compiled module and the hash file
export const modulePath = `${outDir}/${ajvValidate}`
export const routingPath = `${outDir}/${routing}`
export const hashFilePath = `${outDir}/${ajvHash}`
export const hashFilePathTmp = `${outDir}/${ajvHashTmp}`
export const signatureFilePath = `${outDir}/${ajvSigned}`
