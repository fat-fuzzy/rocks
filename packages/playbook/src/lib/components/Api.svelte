<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {Meta} from '$types'

	import {enhance} from '$app/forms'
	import StyleFamily from '$lib/components/StyleFamily.svelte'
	import ui from '@fat-fuzzy/ui'

	const {Button} = ui.blocks

	type Props = {
		path?: string
		categories: string[]
		method?: 'POST' | 'GET'
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
		children,
	}: Props = $props()
	// export let reset = 'reset'

	let apiLayout = 'l:switcher:xs th:xs grow align:center'
	let apiSize = '2xs'
	let apiBreakpoint = '2xs'

	let action =
		formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction
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
		name={`styles-update-${categories[0]}`}
		{method}
		use:enhance
		class={`${apiLayout} bp:${apiBreakpoint} ${apiSize}`}
	>
		{#each categories as category}
			<StyleFamily
				{category}
				meta={category !== 'app' ? meta : undefined}
				formaction={action && actionPath
					? `${actionPath}?/${action}`
					: `?/${action}`}
			/>
		{/each}
		{#await Promise.resolve()}
			<div class={frameClass}>
				<Button
					id={`submit.${path}-${categories[0]}`}
					name={`submit.${path}-${categories[0]}`}
					title="Apply styles"
					type="submit"
					size="lg"
					color="highlight"
					variant="outline"
					shape="round"
					asset="nojs"
				/>
			</div>
		{:then}
			{#if children}
				{@render children()}
			{/if}
		{/await}
	</form>
{/if}
