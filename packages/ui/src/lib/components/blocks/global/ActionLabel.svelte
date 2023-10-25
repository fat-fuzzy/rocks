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
	export let type = '' // asset type: emoji or icon
	export let variant = '' // style: round, [...]
	export let title = '' // text or alt if variant==round
	export let asset = ''
	$: {
		if (type === 'emoji') {
			asset = emojis[currentTheme]
		} else if (type === 'svg') {
			asset = assets[currentTheme]
		}
	}
</script>

{#if type === 'icon'}
	<img src={assets[asset]} alt={title} class={type} />
	{#if variant !== 'round'}
		{title}
	{/if}
{:else if variant === 'round'}
	{asset}
{:else}
	{format.formatLabel(title, asset)}
{/if}
