<script lang="ts">
	import type { Meta } from '$lib/api/props/types';

	import { enhance } from '$app/forms';
	import StyleFamily from '$lib/api/styles/StyleFamily.svelte';
	import { blocks } from '@fat-fuzzy/ui';
	const { Button } = blocks;

	export let categories: string[];
	export let path = '';
	export let method = 'POST';
	export let formaction = 'updateStyles';
	export let actionPath: string | undefined;
	export let redirect: string | undefined;
	export let meta: Meta | undefined = undefined;
	// export let reset = 'reset'

	let apiLayout = 'l:switcher:lg nowrap grow align:center';
	let apiSize = 'lg';
	let apiBreakpoint = 'xxs';

	$: action = formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction;
	$: frameClass = categories && categories[0] === 'app' ? 'l:frame:round' : 'l:frame:twin';

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return;

		document
			.querySelector(`[data-key="${event.key}" i]`)
			?.dispatchEvent(new MouseEvent('click', { cancelable: true }));
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
			return ({ update }) => {
				update({ reset: false });
			};
		}}
		class={`${apiLayout} bp:${apiBreakpoint} bg:polar ${apiSize}`}
	>
		{#each categories as category}
			<StyleFamily
				{category}
				{meta}
				formaction={action ? (actionPath ? `${actionPath}?/${action}` : `?/${action}`) : undefined}
			/>
		{/each}
		{#await Promise.resolve()}
			<div class={frameClass}>
				<Button
					id={`submit.${path}`}
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
			<slot />
		{/await}
	</form>
{/if}
