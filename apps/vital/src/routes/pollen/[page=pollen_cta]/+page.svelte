<script lang="ts">
	import type {RouteNameFor, CurrentCoordinators} from '$types'

	import {getContext} from 'svelte'
	import {resolve} from '$app/paths'
	import {page} from '$app/state'

	import {getThemeForNamespace} from '$lib/styles/theme'
	import PageAction from '$lib/ui/PageAction.svelte'

	const coordinators: CurrentCoordinators = getContext('currentCoordinators')

	let coordPresets = $derived(coordinators.presets)

	let theme = $derived(getThemeForNamespace('pollen'))

	let cta = $derived(page.params.page as RouteNameFor<'pollen'>)
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
		reflect: true,
	}

	let presetsEditor = {
		write: true,
		reflect: true,
	}

	let docEditor = {
		write: true,
		reflect: true,
	}
</script>

{#snippet getStartedSections()}
	<p>To get started you can:</p>
	<ul>
		<li>
			Create your own content: go to <a
				class="font:semibold"
				href={resolve('/pollen/write/')}
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
			href={resolve('/pollen/write')}
			class="font:semibold"
		>
			Edit
		</a>
		or
		<a href={resolve('/pollen/reflect')} class="font:semibold"> Build </a>
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
	route={`/pollen/${cta}`}
	{gettingStarted}
	{twinLayout}
	{editor}
	{builder}
	{presetsEditor}
	{docEditor}
/>
