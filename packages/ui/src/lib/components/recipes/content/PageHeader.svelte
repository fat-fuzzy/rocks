<script lang="ts">
	import type {PageHeaderProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		title = 'PageHeder',
		text,
		layout,
		justify,
		main,
		side,
	}: PageHeaderProps = $props()

	let headerClass = $derived(
		styleHelper.getStyles({
			layout,
			justify,
			align: 'baseline',
		}),
	)

	let mainClasses = $derived(layout === 'center' ? 'text:center' : '')
	let contentClasses = $derived(layout === 'center' ? 'maki:auto' : '')
	let textClass = $derived(text ? `l:text:${text}` : '')
</script>

{#snippet headerMain()}
	{#if main}
		{@render main()}
	{:else}
		<h1>{title}</h1>
	{/if}
{/snippet}

<header
	class={`page-header ${textClass} ${headerClass} ${mainClasses} ${contentClasses}`}
>
	{#if layout === 'sidebar'}
		<div class="l:main">
			{@render headerMain()}
		</div>
		<div class="l:side">
			{#if side}
				{@render side()}
			{/if}
		</div>
	{:else}
		{@render headerMain()}
	{/if}
</header>
