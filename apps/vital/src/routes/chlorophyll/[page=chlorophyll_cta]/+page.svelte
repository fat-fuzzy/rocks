<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {ActionDoc, ICoordinatePresets} from '$types'

	import {getContext} from 'svelte'
	import {resolve} from '$app/paths'
	import {page} from '$app/state'

	import {PAGE_TO_THEME} from '$config/setup'
	import PageAction from '$lib/ui/PageAction.svelte'

	let coordPresets: ICoordinatePresets = getContext('coordPresets')

	let theme = $derived(PAGE_TO_THEME['chlorophyll'] as UiColor)

	let cta = $derived(page.params.page as ActionDoc)
	let query = $derived(page.url.search)

	let gettingStarted = {
		edit: {
			sections: getStartedSections,
			presets: getStartedPresets,
		},
		build: {
			sections: getStartedSections,
			presets: getStartedPresets,
		},
		compare: {
			presets: getStartedCompare,
		},
		print: {
			presets: getStartedPrint,
		},
	}
</script>

{#snippet getStartedSections()}
	<p>To get started you can:</p>
	<ul>
		<li>
			Create your own content: go to <a
				class="font:semibold"
				href={resolve('/chlorophyll/edit/')}
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
			href={resolve('/chlorophyll/edit')}
			class="font:semibold"
		>
			Edit
		</a>
		or
		<a href={resolve('/chlorophyll/build')} class="font:semibold"> Build </a>
	</p>
{/snippet}

{#snippet getStartedCompare()}
	{#if coordPresets.hasPresets()}
		<p class="font:md">Select a Preset to compare</p>
	{:else}
		{@render getStartedPresets()}
	{/if}
{/snippet}

{#snippet getStartedPrint()}
	{#if coordPresets.hasPresets()}
		<p class="font:md">Select a Preset to print</p>
	{:else}
		{@render getStartedPresets()}
	{/if}
{/snippet}

<PageAction
	{theme}
	{cta}
	{query}
	route={`/chlorophyll/${cta}`}
	{gettingStarted}
/>
