<script lang="ts">
	import type {SidebarLayoutProps} from './layout.types.js'

	let {size, align, threshold, side, main}: SidebarLayoutProps = $props()

	let mainClass = threshold ? `l:main th:${threshold}` : 'l:main'
	let alignClass = align ? `align:${align}` : ''
</script>

<div class={`l:sidebar:${size} ${alignClass}`}>
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
