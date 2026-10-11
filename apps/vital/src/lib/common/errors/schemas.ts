import type {SchemaMismatchError} from '#types'
import {SCHEMA_VERSION} from '#config/setup.js'
import {isRawSchema} from '#lib/common/transform/raw-to-typed.js'

export function handleDataTransformError(
	status: string,
	step: string,
	data: unknown,
): SchemaMismatchError {
	switch (status) {
		case 'migration:not-found':
		case 'migration:unversioned':
			return {
				status,
				message: `Data schema version ${isRawSchema(data) ? data.schema_version : '[unversioned]'} is not supported. Supported version: ${SCHEMA_VERSION}. Sync data to fix this error.`,
				details: `[${step}:${status}]`,
				actions: {
					sync: 'data',
				},
			}
		case 'migration:unsupported':
			return {
				status,
				message: `Data schema version ${isRawSchema(data) ? data.schema_version : ''} is not supported. Current app schema version: ${SCHEMA_VERSION}. Update the app to fix this error.`,
				details: `${step}:${status}`,
				actions: {
					sync: 'app',
				},
			}
		default:
			break
	}

	return {
		status,
		message: 'There was an error loading your document',
		details: status,
		actions: {},
	}
}
