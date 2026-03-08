// Reexport your entry components here
import './types/index'

export type * from '$types'

/**
 * TipTap components
 * see: https://tiptap.dev/docs/examples/basics/default-text-editor
 */
import EditorMenu from '$lib/editor/EditorMenu.svelte'
import Tiptap from '$lib/editor/Tiptap.svelte'

const editor = {
	EditorMenu,
	Tiptap,
}

export default editor
