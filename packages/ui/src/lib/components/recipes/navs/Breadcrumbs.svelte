<script lang="ts">
	import type {BreadcrumbsProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id,
		title,
		layout = 'flex',
		size,
		level,
		color,
		background,
		container,
		path,
	}: BreadcrumbsProps = $props()

	let items: {slug: string; title: string; path: string}[] = $derived.by(() => {
		let links: string[] = path.split('/').filter((link: string) => link !== '')
		let hashed = links[links.length - 1].split('#')
		if (hashed.length > 1) {
			links[links.length - 1] = hashed[0]
		}
		let linkPath = ''
		return links.map((link, i) => {
			linkPath = `${linkPath}/${link}`
			let linkTitle =
				i < links.length - 1
					? link.toUpperCase()
					: `${link.charAt(0).toUpperCase()}${link.slice(1)}`

			return {slug: link, title: linkTitle, path: linkPath}
		})
	})

	let navClasses = $derived(
		styleHelper.getStyles({
			color,
			size,
			justify: 'between',
			layout,
			background,
			container,
		}),
	)
</script>

<div class={`l:stack:${size} w:full`}>
	<svelte:element this={`h${level}`} id={title} class="l:flex align:center">
		{title}
	</svelte:element>
	<nav
		id={`breadcrumbs-${id}`}
		class={`breadcrumbs ${navClasses}`}
		data-testid={`breadcrumbs-${id}`}
	>
		<ol class={`l:flex size:${size} align:center unstyled`}>
			{#each items as item, i}
				{@const font = i === items.length - 1 ? '' : 'font:xs'}
				{#if i < items.length - 1}
					<li
						aria-current={path === item.slug ? 'page' : undefined}
						class={`l:flex nowrap align:center`}
					>
						<a
							data-sveltekit-preload-data
							href={item.path}
							class={`l:flex align:center ${font}`}
						>
							{item.title}
						</a>
					</li>
				{/if}
			{/each}
		</ol>
	</nav>
</div>
