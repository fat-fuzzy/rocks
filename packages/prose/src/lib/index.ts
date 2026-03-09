// Reexport your entry components here
import './types/index'
import type {FatFuzzyProse} from '$types'

export type * from '$types'

/**
 * TipTap components
 * see: https://tiptap.dev/docs/examples/basics/default-text-editor
 */
import TiptapMinimal from '$lib/editor/minimal/Tiptap.svelte'
import TiptapBasic from '$lib/editor/basic/Tiptap.svelte'
import TiptapFull from '$lib/editor/full/Tiptap.svelte'

const editor = {
	TiptapMinimal,
	TiptapBasic,
	TiptapFull,
}

export default {editor} as FatFuzzyProse
