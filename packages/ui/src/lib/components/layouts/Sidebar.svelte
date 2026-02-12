<script lang="ts">
	import type {SidebarLayoutProps} from '$types'

	let {
		size,
		align,
		dimensions,
		side,
		main,
		justify,
		reverse,
		wrap,
	}: SidebarLayoutProps = $props()

	let mainClass = $derived(dimensions ? `l:main:${dimensions}` : 'l:main')
	let alignClass = $derived(align ? `align:${align}` : '')
	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let wrapClass = $derived(wrap ? `wrap:${wrap}` : '')
</script>

<div
	class={`l:sidebar size:${size} ${alignClass} ${justifyClass} ${wrapClass}`}
>
	{#if reverse}
		<div class={mainClass}>
			{#if main}
				{@render main()}
			{/if}
		</div>
		<div class="l:side">
			{#if side}
				{@render side()}
			{/if}
		</div>
	{:else}
		<div class="l:side">
			{#if side}
				{@render side()}
			{/if}
		</div>
		<div class={mainClass}>
			{#if main}
				{@render main()}
			{/if}
		</div>
	{/if}
</div>
