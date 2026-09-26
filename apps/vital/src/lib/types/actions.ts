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
	NamespaceId,
	Preset,
	Slug,
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

export type PresetOptions = {
	namespace: NamespaceId
	name: Slug // TODO: use Uuid
}

export type ComparePresetOptions = {
	source: PresetOptions
	target: PresetOptions
}

export type CombinedCoordinators = {
	getPresetCoords: (options: ComparePresetOptions) => {
		source: ICoordinatePresets
		target: ICoordinatePresets
	}
	getCoordDocs: (namespace: NamespaceId) => ICoordinateDocs
	getCoordPresets: (namespace: NamespaceId) => ICoordinatePresets
	getPresetSections: (options: PresetOptions) => Preset | void
	getCoordDocsPair: (
		sourceNamespace: NamespaceId,
		targetNamespace: NamespaceId,
	) => {
		source: ICoordinateDocs
		target: ICoordinateDocs
	}

	setPreset: (options: PresetOptions) => void
	setSourceRoot: (namespace: NamespaceId, root: NamespaceId) => void
	getSourceRoot: (namespace: NamespaceId) => NamespaceId
}
