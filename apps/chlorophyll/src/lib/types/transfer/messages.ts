import type {
	Rank,
	SeedType,
	Slug,
	Uuid,
	DocFormat,
	DocLanguage,
	DocMeta,
	DocPath,
	Document,
	Section,
	Block,
	Prose,
	Preset,
	DocumentStore,
	PresetStore,
	OPFSDocumentTree,
	OPFSPresetTree,
	OPFSBaseTree,
	SeedDocument,
	FrontmatterBase,
	FrontmatterStructure,
} from '$types'

// ── Identifiers ────────────────────────────────────────────────────────────────

export type RequestId = string // crypto.randomUUID()

// ── Commands (writes) ──────────────────────────────────────────────────────────

export type SeedRootCommand = {
	type: 'SEED_ROOT'
	requestId: RequestId
	payload: {seed: SeedDocument[]}
}

export type SeedBaseCommand = {
	type: 'SEED_BASE'
	requestId: RequestId
	payload: {base: FrontmatterBase}
}

export type SeedStructureCommand = {
	type: 'SEED_STRUCTURE'
	requestId: RequestId
	payload: {structures: FrontmatterStructure[]}
}

export type RestoreFromBackupCommand = {
	type: 'RESTORE_FROM_BACKUP'
	requestId: RequestId
	payload: {
		content: OPFSDocumentTree
		presets: OPFSPresetTree
		base: OPFSBaseTree
	}
}

export type SaveBlockCommand = {
	type: 'SAVE_BLOCK'
	requestId: RequestId
	payload: {
		language: DocLanguage
		format: DocFormat
		block: Block
		path: DocPath
	}
}

export type CreateSectionCommand = {
	type: 'CREATE_SECTION'
	requestId: RequestId
	payload: {
		name: Slug
		title?: string
		rank: Rank
		formats: DocFormat[]
		updateRanks: Section[]
	}
}

export type SaveSectionCommand = {
	type: 'SAVE_SECTION'
	requestId: RequestId
	payload: {
		language: DocLanguage
		format: DocFormat
		section: Section
	}
}

export type DeleteDocumentCommand = {
	type: 'DELETE_DOCUMENT'
	requestId: RequestId
	payload: {meta: DocMeta; path: DocPath}
}

export type SaveBaseCommand = {
	type: 'SAVE_BASE'
	requestId: RequestId
	payload: {base: FrontmatterBase}
}

export type SavePresetCommand = {
	type: 'SAVE_PRESET'
	requestId: RequestId
	payload: {meta: DocMeta; path: DocPath; preset: Preset}
}

export type DeletePresetCommand = {
	type: 'DELETE_PRESET'
	requestId: RequestId
	payload: {meta: DocMeta; path: DocPath}
}

export type DeleteAllCommand = {
	type: 'DELETE_ALL'
	requestId: RequestId
}

export type ExportCommand = {
	type: 'EXPORT_ALL'
	requestId: RequestId
	payload: {format: string; language: string}
}

export type Command =
	| SeedRootCommand
	| SeedBaseCommand
	| SeedStructureCommand
	| RestoreFromBackupCommand
	| SaveSectionCommand
	| CreateSectionCommand
	| SaveBaseCommand
	| SaveBlockCommand
	| SavePresetCommand
	| DeleteDocumentCommand
	| DeletePresetCommand
	| DeleteAllCommand
	| ExportCommand

// ── Queries (reads) ────────────────────────────────────────────────────────────

export type GetDocumentBaseQuery = {
	type: 'GET_DOCUMENT_BASE'
	requestId: RequestId
}

export type GetDocumentStructureQuery = {
	type: 'GET_DOCUMENT_STRUCTURE'
	requestId: RequestId
}

export type GetDocumentContentQuery = {
	type: 'GET_DOCUMENT_CONTENT'
	requestId: RequestId
	payload: {meta: DocMeta; path: DocPath}
}

export type GetAllDocumentsQuery = {
	type: 'GET_ALL_DOCUMENTS'
	requestId: RequestId
}

export type GetPresetQuery = {
	type: 'GET_PRESET'
	requestId: RequestId
	payload: {meta: DocMeta; path: DocPath}
}

export type GetAllPresetsQuery = {
	type: 'GET_ALL_PRESETS'
	requestId: RequestId
}

export type CheckSeedQuery = {
	type: 'CHECK_SEED'
	requestId: RequestId
	payload: {type: SeedType}
}

export type Query =
	| GetDocumentBaseQuery
	| GetDocumentStructureQuery
	| GetDocumentContentQuery
	| GetAllDocumentsQuery
	| GetPresetQuery
	| GetAllPresetsQuery
	| CheckSeedQuery

export type WorkerMessage = Command | Query

// ── Responses ──────────────────────────────────────────────────────────────────
// Envelope Pattern (standard API response shape)

export type SuccessResponse<T> = {
	requestId: RequestId
	timestamp: number
	ok: true
	body: T
}

export type ErrorResponse = {
	requestId: RequestId
	timestamp: number
	ok: false
	error: string
}

export type WorkerResponse<T = unknown> = SuccessResponse<T> | ErrorResponse

// ── Response payload types (one per message type) ─────────────────────────────

export type ResponsePayload = {
	SEED_ROOT: {seeded: number}
	SEED_BASE: {seeded: number}
	SEED_STRUCTURE: {seeded: number}
	RESTORE_FROM_BACKUP: {seeded: number} // TODO: rethink this response
	GET_DOCUMENT_CONTENT: Prose | void
	GET_ALL_DOCUMENTS: DocumentStore | void
	SAVE_BASE: {saved: boolean}
	SAVE_BLOCK: {id: Uuid}
	CREATE_SECTION: {name: string}
	SAVE_SECTION: {id: Uuid}
	DELETE_DOCUMENT: {deleted: boolean}
	SAVE_PRESET: {id: Uuid}
	DELETE_PRESET: {deleted: boolean}
	DELETE_ALL: {deleted: boolean}
	EXPORT_ALL: {markdown: string}
	GET_PRESET: {document: Document | void}
	GET_ALL_PRESETS: PresetStore | void
	CHECK_SEED: {seeded: boolean}
}

export type PendingRequest = {
	resolve: (value: ResponsePayload | Promise<ResponsePayload>) => void
	reject: (cause: unknown) => void
	timeout: ReturnType<typeof setTimeout>
}
