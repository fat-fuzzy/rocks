export interface Editor {
	Editor: typeof import('$lib/editor/Editor.svelte').default
}

export interface FatFuzzyProse {
	editor: Editor
}
