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
	let layoutClass = $derived(size ? `l:${layout}:${size}` : `l:${layout}`)
	let headerClass = $derived(
		`${layoutClass} ${justifyClass} align:baseline maki:block:lg`,
	)
	let contentClasses = $derived(media ? `l:text:md` : 'l:text:md margin:auto')
</script>

<header class={headerClass}>
	<div class="l:main">
		<div class={contentClasses}>
			{#if main}
				{@render main()}
			{:else}
				<h1 class="w:auto">{title}</h1>
			{/if}
		</div>
	</div>
	<div class="l:side">
		{#if side}
			{@render side()}
		{/if}
	</div>
</header>
