<script lang="ts">
	import format from '$lib/utils/format.js'
	import {theme} from '$lib/stores/theme.js'
	import {themes, emojis, assets} from '$types/constants.js'

	// TODO: make svg css themeable / fix dark theme
	// import githubDay from '$lib/images/day/icon-github.svg'
	// import githubNight from '$lib/images/night/icon-github.svg'
	// const assets: {[key: string]: string} = {
	// 	day: githubDay,
	// 	night: githubNight,
	// }
	let currentTheme = themes[$theme]
	// let currentLang = langs[$lang]
	// let langIcon = emojis[currentLang]
	export let id = ''
	export let variant = '' // style: round, [...]
	export let title = '' // text or alt if variant==round
	export let asset = '' // asset type: emoji or icon
	let assetValue = ''

	$: {
		if (asset === 'emoji') {
			assetValue = emojis[currentTheme]
		} else if (asset === 'svg') {
			assetValue = assets[currentTheme][id]
		}
	}
</script>

{#if asset === 'svg'}
	<!-- TODO: import svg directly or bsse64 in css -->
	<img src={assetValue} alt={title} class={`${id} ${asset}`} />
	{#if variant !== 'round'}
		{title}
	{/if}
{:else if variant === 'round'}
	{assetValue}
{:else}
	{format.formatLabel(title, assetValue)}
{/if}
