<script lang="ts">
	import type {PageHeaderProps} from '$types'

	let {
		title = 'PageHeder',
		size,
		layout = 'sidebar',
		justify,
		media,
		main,
		side,
	}: PageHeaderProps = $props()

	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let layoutClass = $derived(
		size ? `l:${layout}:${size} reverse` : `l:${layout}`,
	)
	let headerClass = $derived(
		`${layoutClass} ${justifyClass} align:baseline maki:block:lg  ravioli:md`,
	)
	let contentClasses = $derived(media ? `l:text:md` : 'l:text:md maki:auto')
</script>

<header class={headerClass}>
	<div class={layout ? `l:main:50` : ''}>
		<div class={contentClasses}>
			{#if main}
				{@render main()}
			{:else}
				<h1 class="w:auto">{title}</h1>
			{/if}
		</div>
	</div>
	{#if side}
		<div class={layout ? `l:side` : ''}>
			{@render side()}
		</div>
	{/if}
</header>
