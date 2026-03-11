export interface Editor {
	TiptapBasic: typeof import('$lib/editor/basic/Tiptap.svelte').default
	TiptapFull: typeof import('$lib/editor/full/Tiptap.svelte').default
}

export interface FatFuzzyProse {
	editor: Editor
}
