<script lang="ts">
	import {enhance} from '$app/forms'
	import StyleFamily from '$lib/api/styles/StyleFamily.svelte'
	import Button from '../../components/blocks/buttons/Button.svelte'

	export let title = ''
	export let categories = ['app']
	export let page = ''
	export let method = 'POST'
	export let formaction = 'enter'
	// export let reset = 'reset'

	let apiLayout = categories[0] != 'app' ? 'nowrap reverse grow' : 'nowrap shrink'
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
	class={`l:switcher:${apiSize} ${apiLayout} bp:${apiBreakpoint} bg:polar ${apiSize}`}
>
	{#each categories as category}
		<StyleFamily {category} {title} />
	{/each}
	{#await Promise.resolve()}
		<div class="card:xl l:flex justify:center">
			<div class="l:frame:square">
				<Button
					id={`submit.${page}`}
					title="Apply styles"
					type="submit"
					size="xl"
					color="primary"
					variant="round"
					asset="emoji:sparkles"
				/>
			</div>
		</div>
	{:then}
		<slot />
	{/await}
</form>
