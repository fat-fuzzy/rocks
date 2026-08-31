<script lang="ts">
	import type {UiLayout} from '@fat-fuzzy/ui'
	import type {ICoordinatePresets} from '$types'

	import {getContext} from 'svelte'
	import {page} from '$app/state'
	import {resolve} from '$app/paths'

	import {CTA_TO_ACTION_TRANSFORM} from '$lib/intl/l10n'
	import MenuSections from '$lib/ui/controls/section/MenuSections.svelte'
	import MenuSettings from '$lib/ui/controls/settings/MenuSettings.svelte'
	import MenuData from '$lib/ui/controls/data/MenuData.svelte'

	let coordPresets: ICoordinatePresets = getContext('coordPresets')

	let {layout = 'switcher', oninput}: {layout?: UiLayout; oninput: () => void} =
		$props()

	let cta = $derived(page.params.page)
	let preset = $derived(page.url.searchParams.get('preset') || '')
	let linkStyles = $state('font:xs font:semibold font:heading w:full')
</script>

<div class="l:stack maki:inline:4xs">
	<nav id="secondary-nav">
		<ul class={`unstyled input-group l:${layout}:3xs w:full justify:between`}>
			{#each Object.entries(CTA_TO_ACTION_TRANSFORM) as [key, value], i (i)}
				{@const classes =
					key === cta ? linkStyles : `${linkStyles} ink:primary`}
				{@const presetQuery = preset ? coordPresets.getPresetQuery(preset) : ''}

				<li
					aria-current={key === cta}
					class="cta text:center surface:2:primary shape:mellow l:flex"
				>
					<a
						href={resolve(`/mycelium/${key}${presetQuery}`)}
						class={linkStyles}
						onclick={() => {
							if (cta !== 'compare') {
								coordPresets.setSourcePreset()
								coordPresets.setTargetPreset()
							}
						}}
					>
						<span class={classes}>{value}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="l:flex:2xs w:full justify:between grow">
		<div class="l:flex:2xs justify:between grow">
			{#if cta === 'analyze' || cta === 'engage'}
				<MenuSections {oninput} color="primary" variant="outline" />
			{/if}
		</div>
		<div class="l:flex:2xs justify:between hug">
			<MenuSettings {oninput} color="primary" variant="outline" />
			<MenuData id="button-import" color="primary" />
		</div>
	</div>
</div>
