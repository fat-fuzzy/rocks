import type {MigrationStatus, MigrationTarget, DbStatus} from '#types'

export type SchemaMismatchError = {
	status: MigrationStatus
	message: string
	details: string
	actions: {
		sync?: MigrationTarget
	}
}

export type DbInitError = {
	status: DbStatus
	message: string
	details: string
}

export type VitalError = SchemaMismatchError | DbInitError
