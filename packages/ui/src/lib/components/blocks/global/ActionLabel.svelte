<script lang="ts">
	import format from '$lib/utils/format.js'
	import {emojis, assets} from '$types/constants.js'

	export let type = '' // asset type: emoji or icon
	export let variant = '' // style: round, [...]
	export let asset = '' // key for asset in [emojis or assets]
	export let title = '' // text or alt if variant==round
</script>

{#if type === 'icon'}
	<img src={assets[asset]} alt={title} class={type} />
	{#if variant !== 'round'}
		{title}
	{/if}
{:else if variant === 'round'}
	{emojis[asset]}
{:else}
	{format.formatLabel(title, asset)}
{/if}
