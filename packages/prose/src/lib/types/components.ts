export interface Editor {
	EditorMenu: typeof import('$lib/editor/EditorMenu.svelte').default
	Tiptap: typeof import('$lib/editor/Tiptap.svelte').default
}

export interface FatFuzzyProse {
	editor: Editor
}
