<script lang="ts">
	import type { Snippet } from 'svelte'
	import type {Meta} from '$lib/props/types'

	import {enhance} from '$app/forms'
	import StyleFamily from '$lib/components/StyleFamily.svelte'
	import {blocks} from '@fat-fuzzy/ui-s5'
	const {Button} = blocks

	type Props = {
		path?: string
		categories: string[]
		method?: string
		actionPath?: string
		redirect?: string
		formaction?: string
		meta: Meta
		children?: Snippet
	}

	let {
		path,
		categories,
		actionPath,
		redirect,
		method = 'POST',
		formaction = 'updateStyles',
		meta,
		children
	}: Props = $props()
	// export let reset = 'reset'

	let apiLayout = 'l:switcher:xs nowrap grow align:center'
	let apiSize = '2xs'
	let apiBreakpoint = '2xs'

	let action = $derived(
		formaction && redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction,
	)
	let frameClass = $derived(
		categories && categories[0] === 'app' ? 'l:frame:round' : 'l:frame:twin',
	)

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
{#if categories?.length}
	<form
		name="styles-update"
		{method}
		action={action && actionPath ? `${actionPath}?/${action}` : `?/${action}`}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
		class={`${apiLayout} bp:${apiBreakpoint} bg:polar ${apiSize}`}
	>
		{#each categories as category}
			<StyleFamily
				{category}
				{meta}
				formaction={action
					? actionPath
						? `${actionPath}?/${action}`
						: `?/${action}`
					: undefined}
			/>
		{/each}
		{#await Promise.resolve()}
			<div class={frameClass}>
				<Button
					id={`submit.${path}`}
					name={`submit.${path}`}
					title="Apply styles"
					type="submit"
					size="lg"
					color="highlight"
					variant="outline"
					shape="round"
					asset="emoji:nojs"
				/>
			</div>
		{:then}
			{#if children}
				{@render children()}
			{/if}
		{/await}
	</form>
{/if}
