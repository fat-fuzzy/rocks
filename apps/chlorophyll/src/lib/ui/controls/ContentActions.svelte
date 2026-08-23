<script lang="ts">
	import type {UiLayout} from '@fat-fuzzy/ui'

	import {page} from '$app/state'
	import {resolve} from '$app/paths'

	import MenuSections from '$lib/ui/controls/section/MenuSections.svelte'
	import MenuSettings from '$lib/ui/controls/settings/MenuSettings.svelte'
	import MenuData from '$lib/ui/controls/data/MenuData.svelte'

	let {layout = 'switcher', oninput}: {layout?: UiLayout; oninput: () => void} =
		$props()

	let cta = $derived(page.params.page)
	let query = $derived(page.url.search)

	const CTA_OPTIONS = {
		edit: 'Edit',
		build: 'Build',
		preview: 'Preview',
		print: 'Print',
	}

	let linkStyles = $state('font:xs font:semibold font:heading w:full')
</script>

<div class="l:stack maki:inline:4xs">
	<nav id="secondary-nav">
		<ul class={`unstyled input-group l:${layout}:3xs w:full justify:between`}>
			{#each Object.entries(CTA_OPTIONS) as [key, value], i (i)}
				{@const classes =
					key === cta ? linkStyles : `${linkStyles} ink:primary`}
				<li
					aria-current={key === cta}
					class="cta text:center surface:2:primary shape:mellow l:flex"
				>
					<a href={resolve(`/cv/${key}${query}`)} class={linkStyles}>
						<span class={classes}>{value}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="l:flex:2xs w:full justify:between grow">
		<div class="l:flex:2xs justify:between grow">
			{#if cta === 'edit' || cta === 'build'}
				<MenuSections {oninput} color="accent" variant="fill" />
			{/if}
		</div>
		<div class="l:flex:2xs justify:between hug">
			<MenuSettings {oninput} color="accent" variant="outline" />
			<MenuData id="button-import" label="Data" color="accent" {oninput} />
		</div>
	</div>
</div>
