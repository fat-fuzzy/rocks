import fs from 'fs'
import path from 'path'
import {execSync} from 'child_process'
import crypto from 'crypto'
import AWS from 'aws-sdk'

// Configure AWS SDK
AWS.config.update({region: 'your-region'})
const s3 = new AWS.S3()

// Path to the compiled module
const modulePath = path.join('./src/ajv', 'out/validate.ajv.mjs')

// Read the compiled module code
const moduleCode = fs.readFileSync(modulePath, 'utf-8')

// Calculate the hash of the module code
const computedHash = crypto
	.createHash('sha256')
	.update(moduleCode)
	.digest('hex')

// Function to retrieve the signature from S3
async function getSignatureFromS3(bucketName, key) {
	const params = {
		Bucket: bucketName,
		Key: key,
	}
	const data = await s3.getObject(params).promise()
	return data.Body.toString('utf-8').trim()
}

// Verify the hash
;(async () => {
	try {
		const bucketName = 'your-bucket-name'
		const key = 'path/to/validate.ajv.mjs.hash.sig'
		const signature = await getSignatureFromS3(bucketName, key)

		// Write the computed hash to a temporary file
		const computedHashFilePath = path.join(
			'./src/ajv',
			'out/validate.ajv.mjs.hash.tmp',
		)
		fs.writeFileSync(computedHashFilePath, computedHash)

		// Write the signature to a temporary file
		const signatureFilePath = path.join(
			'./src/ajv',
			'out/validate.ajv.mjs.hash.sig.tmp',
		)
		fs.writeFileSync(signatureFilePath, signature)

		// Verify the signature using GPG
		execSync(`gpg --verify ${signatureFilePath} ${computedHashFilePath}`)
		console.log('✅ Integrity check passed.')
		process.exit(0)
	} catch (error) {
		console.error('❌ Integrity check failed.')
		process.exit(1)
	} finally {
		// Clean up the temporary files
		fs.unlinkSync(computedHashFilePath)
		fs.unlinkSync(signatureFilePath)
	}
})()
