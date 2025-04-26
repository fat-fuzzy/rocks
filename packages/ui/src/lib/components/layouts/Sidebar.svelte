<script lang="ts">
	import type {SidebarLayoutProps} from '$types'

	let {
		size,
		align,
		dimension,
		side,
		main,
		justify,
		reverse,
		wrap,
	}: SidebarLayoutProps = $props()

	let mainClass = dimension ? `l:main:${dimension}` : 'l:main'
	let alignClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''
	let wrapClass = wrap ? `wrap:${wrap}` : ''
</script>

<div class={`l:sidebar:${size} ${alignClass} ${justifyClass} ${wrapClass}`}>
	{#if reverse}
		<div class={mainClass}>
			{#if main}
				{@render main()}
			{/if}
		</div>
		<div class={`l:side`}>
			{#if side}
				{@render side()}
			{/if}
		</div>
	{:else}
		<div class={`l:side`}>
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
