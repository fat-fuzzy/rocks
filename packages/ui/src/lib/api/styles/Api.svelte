<script lang="ts">
	import type {StyleTree} from './types'

	import {enhance} from '$app/forms'
	import StyleFamily from '$lib/api/styles/StyleFamily.svelte'
	import {initStyles} from './styles-api'
	import {currentStyles} from '$lib/stores/api'

	export let title = ''
	export let category = ''
	export let page = ''
	export let method = 'POST'
	export let formaction = 'enter'
	// export let reset = 'reset'

	let styles: StyleTree
	let apiLayout = 'switcher'
	let apiSize = 'lg'
	let apiBreakpoint = 'xxl'

	let stylesApi = initStyles()

	$: styles = $currentStyles
	$: styles && stylesApi.applyStyles(styles)
	$: styleCategories =
		category === 'app' || category === 'shared' ? [category] : [category, 'shared']
	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return

		document
			.querySelector(`[data-key="${event.key}" i]`)
			?.dispatchEvent(new MouseEvent('click', {cancelable: true}))
	}
</script>

<svelte:window on:keydown={keydown} />

<form
	{method}
	action={page ? `/${page}?/${formaction}` : `?/${formaction}`}
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({update}) => {
			update({reset: false})
		}
	}}
	class={`l:${apiLayout} bp:${apiBreakpoint} ${apiSize}`}
>
	{#each styleCategories as family}
		<StyleFamily category={family} {title} />
	{/each}
	<!-- <button data-key="enter">Update UI</button> -->
</form>
