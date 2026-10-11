import type {MigrationStatus, MigrationStep, SchemaMismatchError} from '#types'
import {SCHEMA_VERSION} from '#config/setup.js'
import {isRawSchema} from '#lib/common/transform/raw-to-typed.js'

export function handleDataTransformError(
	step: MigrationStep,
	message: string,
	data: unknown,
): SchemaMismatchError {
	const [process, status] = message.split(':')
	const error = {
		status: status as MigrationStatus,
		message: 'There was an error loading your document',
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
				error.actions = {}
			}
			break
		case 'outdated':
			{
				error.message = `Data schema version ${isRawSchema(data) ? data.schema_version : ''} is not supported. Current app schema version: ${SCHEMA_VERSION}. Update the app to fix this error.`
				error.actions = {
					sync: 'app',
				}
			}
			break
		case 'unsupported':
			{
				error.message = `App schema version ${SCHEMA_VERSION} is unsupported. Update SCHEMA_VERSION settings to fix this error.`
				error.actions = {
					sync: 'app',
				}
			}
			break
		default:
			break
	}

	return error
}
