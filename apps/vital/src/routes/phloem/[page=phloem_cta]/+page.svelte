<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {ActionResource, CurrentCoordinators} from '$types'

	import {getContext} from 'svelte'
	import {resolve} from '$app/paths'
	import {page} from '$app/state'

	import {PAGE_TO_THEME} from '$config/setup'
	import PageAction from '$lib/ui/PageAction.svelte'

	const coordinators: CurrentCoordinators = getContext('currentCoordinators')

	let coordPresets = $derived(coordinators.presets)

	let theme = $derived(PAGE_TO_THEME['phloem'] as UiColor)

	let cta = $derived(page.params.page as ActionResource)
	let query = $derived(page.url.search)

	let gettingStarted = {
		write: {
			sections: getStartedSections,
			presets: getStartedPresets,
		},
		reflect: {
			sections: getStartedSections,
			presets: getStartedPresets,
		},
		explore: {
			presets: getStartedCompare,
		},
	}

	let twinLayout = {
		explore: true,
	}

	let editor = {
		write: true,
	}

	let builder = {
		build: true,
	}
</script>

{#snippet getStartedSections()}
	<p>To get started you can:</p>
	<ul>
		<li>
			Create your own content: go to <a
				class="font:semibold"
				href={resolve('/phloem/write/')}
			>
				Edit
			</a>, then click on
			<span class="font:semibold"> New Section </span>
		</li>
		<li>
			Load the demo: under <span class="font:semibold"> Data > Reset </span>,
			click on
			<span class="font:semibold"> Seed Demo </span>
		</li>
	</ul>
{/snippet}

{#snippet getStartedPresets()}
	<p>
		To get started, first create a Preset from <a
			href={resolve('/phloem/write')}
			class="font:semibold"
		>
			Edit
		</a>
		or
		<a href={resolve('/phloem/reflect')} class="font:semibold"> Build </a>
	</p>
{/snippet}

{#snippet getStartedCompare()}
	{#if coordPresets.hasPresets()}
		<p class="font:md">Select a Preset to compare</p>
	{:else}
		{@render getStartedPresets()}
	{/if}
{/snippet}

<PageAction
	{theme}
	{cta}
	{query}
	route={`/phloem/${cta}`}
	{gettingStarted}
	{twinLayout}
	{editor}
	{builder}
/>
