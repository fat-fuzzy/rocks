<script lang="ts">
	import type {SidebarLayoutProps} from '$types'

	let {size, align, threshold, side, main, justify}: SidebarLayoutProps = $props()

	let mainClass = threshold ? `l:main th:${threshold}` : 'l:main'
	let alignClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''
</script>

<div class={`l:sidebar:${size} ${alignClass} ${justifyClass}`}>
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
</div>
