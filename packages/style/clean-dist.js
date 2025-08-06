import fs from 'node:fs'
import path from 'node:path'

// Resolve relative to the script location
const outDir = path.resolve('dist')

if (fs.existsSync(outDir)) {
	fs.rmSync(outDir, {recursive: true, force: true})
}

fs.mkdirSync(outDir, {recursive: true})
