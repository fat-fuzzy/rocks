<script lang="ts">
	import type {PageNavProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id = 'page-nav',
		size = '2xs',
		layout = 'switcher',
		align = 'center',
		hash,
		items,
	}: PageNavProps = $props()

	let currentHash = $state(hash ?? '')
	let linkLayoutClasses = styleHelper.getStyles({
		size,
		layout: 'flex',
		align: 'center',
	})
	let layoutClasses = styleHelper.getStyles({
		size,
		layout,
		align,
	})
</script>

<nav aria-label="Page Navigation" {id} class={id}>
	<ul class={`${layoutClasses} unstyled`}>
		{#each items as { title, slug, color, size, variant, shape, asset }}
			{@const iconClasses = styleHelper.getStyles({
				color,
				size,
				variant,
				shape,
				asset,
				assetType: 'emoji',
			})}
			{@const linkClasses = styleHelper.getStyles({
				font: 'sm',
				size: '3xs',
				color,
				container: 'ravioli',
			})}
			<li aria-current={currentHash === slug ? 'page' : undefined}>
				<a
					id={`tab-${slug}`}
					href={`#${slug}`}
					class={`${linkLayoutClasses} ${linkClasses} surface:0:${color} link`}
					onclick={() => {
						currentHash = slug
					}}
				>
					<ff-icon class={iconClasses}></ff-icon>
					{title}
				</a>
			</li>
		{/each}
	</ul>
</nav>
