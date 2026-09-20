import type {
	IAggregateDataLifecycle,
	IAggregateDocs,
	IAggregateMetadata,
	IAggregatePresets,
	ICoordinateDocs,
	ICoordinateExports,
	ICoordinateImports,
	ICoordinateMetadata,
	ICoordinatePresets,
} from '$types'

export type ActionCrud = 'save' | 'delete' | 'update' | 'copy'

export type Aggregators = {
	aggDataLifecycle: IAggregateDataLifecycle
	aggDocs: IAggregateDocs
	aggPresets: IAggregatePresets
	aggMetadata: IAggregateMetadata
}

export type Coordinators = {
	coordDocs: ICoordinateDocs
	coordExports: ICoordinateExports
	coordImports: ICoordinateImports
	coordMetadata: ICoordinateMetadata
	coordPresets: ICoordinatePresets
}

export type CurrentCoordinators = {
	metadata: ICoordinateMetadata
	docs: ICoordinateDocs
	presets: ICoordinatePresets
	imports: ICoordinateImports
	exports: ICoordinateExports
}
