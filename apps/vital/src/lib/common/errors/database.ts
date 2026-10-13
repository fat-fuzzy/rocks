import type {MigrationStatus, DbStep, DbInitError} from '#types'
import {SCHEMA_VERSION} from '#config/setup.js'
import {isRawSchema} from '#lib/common/transform/raw-to-typed.js'

export function handleDatabaseError(
	step: DbStep,
	message: string,
	data: unknown,
): DbInitError {
	const [process, status] = message.split(':')
	const error = {
		status: status as MigrationStatus,
		message: 'There was an error accessing storage',
		details: `${step}:${process}:${status}`,
		actions: {},
	}

	switch (status) {
		case 'unversioned':
			{
				error.message = `Data schema version ${isRawSchema(data) ? data.schema_version : ''} is not supported. Supported version: ${SCHEMA_VERSION}. Sync data to fix this error.`
				error.actions = {
					sync: 'data',
				}
			}
			break
		case 'not-found':
			{
				error.message = `No migration path found from version ${isRawSchema(data) ? data.schema_version : '[unversioned]'} to version: ${SCHEMA_VERSION}.`
				error.actions = {
					sync: 'code',
				}
			}
			break
		case 'sync-db':
			{
				error.message = `Data schema version ${isRawSchema(data) ? data.schema_version : ''} is not supported. Current db version: ${SCHEMA_VERSION}. Update db fix this error.`
				error.actions = {
					sync: 'code',
				}
			}
			break
		case 'unsupported':
			{
				error.message = `DB version ${SCHEMA_VERSION} is unsupported. Update db fix this error.`
				error.actions = {
					sync: 'code',
				}
			}
			break
		default:
			break
	}

	return error
}
