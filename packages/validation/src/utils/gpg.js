import fs from 'node:fs'
import path from 'node:path'
import {execSync} from 'child_process'

const HASH_FILE_PATH = path.join('./src/ajv', 'out/validate.ajv.mjs.hash.tmp')
const SIGNATURE_FILE_PATH = path.join(
	'./src/ajv',
	'out/validate.ajv.mjs.hash.sig',
)
const GPG_OPTIONS = `--batch --yes`

// Sign the hash using GPG (signature detached)
function signHashDetached(hash) {
	fs.writeFileSync(HASH_FILE_PATH, hash)
	execSync(
		`gpg ${GPG_OPTIONS} --output ${SIGNATURE_FILE_PATH} --detach-sign ${HASH_FILE_PATH}`,
	)
	fs.unlinkSync(HASH_FILE_PATH)
	console.log(`Signature stored in: ${SIGNATURE_FILE_PATH}`)
}

// Verify the hash using GPG (signature detached)
function verifyHashDetached(hash) {
	fs.writeFileSync(HASH_FILE_PATH, hash)
	try {
		execSync(`gpg --verify ${SIGNATURE_FILE_PATH} ${HASH_FILE_PATH}`)
		console.log('✅ Integrity check passed.')
		process.exit(0)
	} catch (error) {
		console.error('❌ Integrity check failed.')
		process.exit(1)
	} finally {
		fs.unlinkSync(HASH_FILE_PATH)
	}
}

// Sign the hash using GPG (signature attached)
function signHashNonDetached(hash) {
	fs.writeFileSync(HASH_FILE_PATH, hash)
	execSync(
		`gpg ${GPG_OPTIONS} --output ${SIGNATURE_FILE_PATH} --sign ${HASH_FILE_PATH}`,
	)
	fs.unlinkSync(HASH_FILE_PATH)
	console.log(`Signature embedded in: ${HASH_FILE_PATH}`)
}

// Verify the hash using GPG (signature attached)
function verifyHashNonDetached(hash) {
	fs.writeFileSync(HASH_FILE_PATH, hash)
	try {
		execSync(`gpg --verify ${HASH_FILE_PATH}`)
		console.log('✅ Integrity check passed.')
		process.exit(0)
	} catch (error) {
		console.error('❌ Integrity check failed.')
		process.exit(1)
	} finally {
		fs.unlinkSync(HASH_FILE_PATH)
	}
}

export default {
	signHashNonDetached,
	verifyHashNonDetached,
	signHashDetached,
	verifyHashDetached,
}
