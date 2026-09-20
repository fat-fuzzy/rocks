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

// TODO: clean out these types : use generated  type
export type ActionDoc = 'edit' | 'build' | 'compare' | 'print'
export type ActionResource = 'write' | 'reflect' | 'explore'
export type ActionTransform = 'analyze' | 'engage'
export type ActionCrud = 'save' | 'delete' | 'update' | 'copy'

// TODO: UPDATE on route changes
export type VitalPage = 'chlorophyll' | 'pollen'

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
