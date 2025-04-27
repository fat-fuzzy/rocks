<script lang="ts">
	import type {PageHeaderProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		title = 'PageHeder',
		size,
		layout,
		justify,
		media,
		main,
		side,
	}: PageHeaderProps = $props()

	let headerClass = $derived(
		styleHelper.getStyles({
			layout,
			size,
			justify,
			align: 'baseline',
		}),
	)

	let mainClasses = $derived(layout === 'center' ? `text:center` : '')
	let contentClasses = $derived(media ? `l:text:md` : 'l:text:md maki:auto')
</script>

{#snippet headerMain()}
	{#if main}
		{@render main()}
	{:else}
		<h1 class={contentClasses}>{title}</h1>
	{/if}
{/snippet}

<header class={`page-header ${headerClass} ${mainClasses}`}>
	{#if layout === 'tgv'}
		<div class="l:main:50">
			{@render headerMain()}
		</div>
	{:else if layout === 'voyager' || layout === 'steam'}
		<div class="l:main:50">
			{@render headerMain()}
		</div>
	{/if}
	{#if layout === 'sidebar'}
		<div class="l:main:50">
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
