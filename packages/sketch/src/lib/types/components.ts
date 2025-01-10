export interface Graphics {
	Sketch: typeof import('$lib/components/sketch/Sketch.svelte').default
}

export interface FatFuzzySketch {
	graphics: Graphics
	// constants: typeof import('$lib/types/constants.js').default
}
