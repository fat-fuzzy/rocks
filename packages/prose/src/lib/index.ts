// Reexport your entry components here
import './types/index'
import type {FatFuzzyProse} from '$types'

export type * from '$types'

/**
 * TipTap components
 * see: https://tiptap.dev/docs/examples/basics/default-text-editor
 */
import Editor from '$lib/editor/Editor.svelte'

const editor = {
	Editor,
}

export default {editor} as FatFuzzyProse
