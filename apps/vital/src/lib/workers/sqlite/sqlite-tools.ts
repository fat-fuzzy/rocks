import sqlite3InitModule from '@sqlite.org/sqlite-wasm'

// @ts-expect-error SQLite
const start = (sqlite3) => {
	console.log('Running SQLite3 version', sqlite3.version.libVersion)
	let db

	if (sqlite3.capi.sqlite3_vfs_find('opfs')) {
		console.log(' sqlite3_vfs_find OPFS VFS is available ...')
	}
	// Alternately:
	if (sqlite3.oo1.OpfsDb) {
		db = new sqlite3.oo1.OpfsDb('/mydb.sqlite3')
		console.log('OPFS is available, created persisted database at', db.filename)
	} else {
		db = new sqlite3.oo1.DB('/mydb.sqlite3', 'ct')
		console.log(
			'OPFS is not available, created transient database',
			db.filename,
		)
	}
	try {
		console.log('Creating a table...')
		db.exec('CREATE TABLE IF NOT EXISTS t(a,b)')
		console.log('Insert some data using exec()...')
		for (let i = 20; i <= 25; ++i) {
			db.exec({
				sql: 'INSERT INTO t(a,b) VALUES (?,?)',
				bind: [i, i * 2],
			})
		}
		console.log('Query data with exec()...')
		db.exec({
			sql: 'SELECT a FROM t ORDER BY a LIMIT 3',
			// @ts-expect-error SQLite
			callback: (row) => {
				console.log(row)
			},
		})
	} finally {
		db.close()
	}
	// Your SQLite code here.
}

export async function initializeSQLite() {
	console.log(`typeof WorkerGlobalScope !== 'undefined'`)
	console.log(typeof WorkerGlobalScope !== 'undefined')
	try {
		console.log('Loading and initializing SQLite3 module...')
		const sqlite3 = await sqlite3InitModule()
		console.log({
			crossOriginIsolated: self.crossOriginIsolated,
			isWorker: typeof WorkerGlobalScope !== 'undefined',
			hasSAB: typeof SharedArrayBuffer !== 'undefined',
			opfsVfs: !!sqlite3.capi.sqlite3_vfs_find('opfs'),
			hasOpfsNs: 'opfs' in sqlite3,
		})
		console.log('Done initializing. Running demo...')
		start(sqlite3)
	} catch (error) {
		const {name, message} = error as Error

		console.error('SQLite3 Initialization error:', name, message)
	}
}

export function pingBack() {
	return {time: Date.now()}
}
