<script lang="ts">
	import type {UiColor, UiLayout, UiSize} from '@fat-fuzzy/ui'
	import type {VitalPage, ICoordinatePresets} from '$types'

	import {getContext} from 'svelte'
	import {page} from '$app/state'
	import {resolve} from '$app/paths'

	import MenuData from '$lib/ui/controls/data/MenuData.svelte'
	import MenuSections from '$lib/ui/controls/section/MenuSections.svelte'
	import MenuSettings from '$lib/ui/controls/settings/MenuSettings.svelte'
	let coordPresets: ICoordinatePresets = getContext('coordPresets')

	let {
		layout = 'switcher',
		color = 'primary',
		size = '2xs',
		font = 'xs',
		path,
		actions,
		oninput,
	}: {
		layout?: UiLayout
		color?: UiColor
		size?: UiSize
		font?: UiSize
		path: VitalPage
		actions: {[key: string]: string}
		oninput: () => void
	} = $props()

	let cta = $derived(page.params.page)
	let preset = $derived(page.url.searchParams.get('preset') || '')
	let linkStyles = $state('font:xs font:semibold font:heading w:full')
</script>

<div class="ui-controls l:stack maki:inline:4xs">
	<nav id="secondary-nav">
		<ul class={`unstyled input-group l:${layout}:3xs w:full justify:between`}>
			{#each Object.entries(actions) as [key, value], i (i)}
				{@const classes =
					key === cta ? linkStyles : `${linkStyles} ink:${color}`}
				{@const presetQuery = preset ? coordPresets.getPresetQuery(preset) : ''}
				<li
					aria-current={key === cta}
					class={`cta text:center surface:2:${color} shape:mellow l:flex`}
				>
					<a
						href={resolve(`/${path}/${key}${presetQuery}`)}
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
			{#if cta === 'edit' || cta === 'build' || cta === 'analyze' || cta === 'engage'}
				<MenuSections {oninput} {color} variant="outline" {size} {font} />
			{/if}
		</div>
		<div class="l:flex:2xs justify:between hug">
			{#if cta !== 'compare'}
				<MenuSettings {oninput} {color} variant="outline" {size} {font} />
			{/if}
			<MenuData id="button-import" {color} {size} {font} />
		</div>
	</div>
</div>
