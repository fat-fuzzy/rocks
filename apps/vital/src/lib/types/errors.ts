import type {MigrationStatus, MigrationTarget} from '#types'

export type SchemaMismatchError = {
	status: MigrationStatus
	message: string
	details: string
	actions: {
		sync?: MigrationTarget
	}
}

export type VitalError = SchemaMismatchError
