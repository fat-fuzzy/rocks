import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import utils from '../src/utils/gpg.js'

const SIG_OPTIONS = {
	gpg: false,
	// detached: true, only set this option if gpg is true
}
// Path to the compiled module and the hash file

const MODULE_FILE_PATH = path.join('./src/ajv', 'out/validate.ajv.mjs')
const HASH_OUTPUT_FILE_PATH = path.join(
	'./src/ajv',
	'out/validate.ajv.mjs.hash',
)

// Read the compiled module code
const moduleCode = fs.readFileSync(MODULE_FILE_PATH, 'utf-8')
// Read the known good hash
const knownGoodHash = fs.readFileSync(HASH_OUTPUT_FILE_PATH, 'utf-8').trim()

// Calculate the hash of the module code
const computedHash = crypto
	.createHash('sha256')
	.update(moduleCode)
	.digest('hex')

// Compare the computed hash with the known good hash
if (computedHash === knownGoodHash) {
	console.log('✅ Integrity check passed: hashes match.')
} else {
	console.error('❌ Integrity check failed: hashes do not match.')
	process.exit(1)
}

if (SIG_OPTIONS.gpg) {
	if (SIG_OPTIONS.detached) {
		utils.verifyHashDetached(computedHash)
	} else {
		utils.verifyHashNonDetached(computedHash)
	}
}
