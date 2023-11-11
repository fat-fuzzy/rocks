<script lang="ts">
	import {enhance} from '$app/forms'
	import StyleFamily from '$lib/api/styles/StyleFamily.svelte'

	export let title = ''
	export let category = ''
	export let page = ''
	export let method = 'POST'
	export let formaction = 'enter'
	// export let reset = 'reset'

	let apiLayout = category != 'app' ? 'nowrap reverse grow' : 'nowrap shrink'
	let apiSize = 'lg'
	let apiBreakpoint = 'xxs'

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
	class={`l:switcher:${apiSize} ${apiLayout} bp:${apiBreakpoint} bg:polar card:${apiSize} ${apiSize}`}
>
	<StyleFamily {category} {title} />
</form>
