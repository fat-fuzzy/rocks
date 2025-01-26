<script lang="ts">
	import type {SequenceItemProps} from '$types'
	import Picture from '$lib/components/blocks/media/Picture.svelte'

	let {
		item,
		level,
		variant = 'primary',
		active = false,
		onchange,
	}: {
		item: SequenceItemProps
		level: number
		variant?: string
		active?: boolean
		onchange?: (active: boolean) => void
	} = $props()

	let style = $derived(active ? 'clip: rect(0px, 817px, 744px, 544px);' : '')
</script>

<li class={`l:frame:twin item`} class:active>
	{#if item.link}
		<div class="l:burrito:lg">
			<div
				class={`card:xs font:lg text:center surface:4:${variant} emoji:${item.asset}`}
			>
				<a href={item.link} class={`h${level + 2}`}>
					{item.title}
				</a>
			</div>
		</div>
	{:else if item.title}
		<div class={`card:lg text:center`}>
			<svelte:element
				this={`h${level}`}
				class={`emoji:${item.asset} h${level + 1}`}
			>
				{item.title}
			</svelte:element>
		</div>
	{/if}
	{#if item.image}
		<div class="media l:stack:2xl" {style}>
			<Picture {...item.image} />
		</div>
	{/if}
</li>

<style>
	.item {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		.media {
			display: none;
		}

		&.active .media {
			display: block;
			object-fit: contain;
		}
	}
</style>
