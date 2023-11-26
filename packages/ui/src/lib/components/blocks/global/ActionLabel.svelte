<script lang="ts">
	import format from '$lib/utils/format.js'
	import {emojis, assets} from '$types/constants.js'

	export let id = ''
	export let brightness: any // theme store
	export let shape = '' // style: round, [...]
	export let title = '' // text or alt if
	export let asset = '' // asset type: emoji or icon
	let assetValue = ''

	$: {
		if (asset === 'emoji') {
			assetValue = emojis[brightness]
		} else if (asset === 'svg') {
			assetValue = assets[brightness] ? assets[brightness][id] : ''
		}
	}
</script>

{#if asset === 'svg'}
	<!-- TODO: import svg directly or bsse64 in css -->
	<img src={assetValue} alt={title} class={`${id} ${asset}`} />
	{#if shape !== 'round'}
		{title}
	{/if}
{:else if shape === 'round'}
	{assetValue}
{:else}
	{format.formatLabel(title, assetValue)}
{/if}
