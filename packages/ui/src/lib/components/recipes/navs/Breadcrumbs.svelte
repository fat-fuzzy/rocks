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
		breadcrumbTabs,
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

<nav {id} class={`breadcrumbs w:full ${navClasses}`}>
	<ul {id} class={`l:flex size:${size} align:center unstyled`} data-testid={id}>
		{#each items as item, i}
			{@const font = i === items.length - 1 ? '' : 'font:xs'}
			<li
				aria-current={path === item.slug ? 'page' : undefined}
				class={`l:flex nowrap align:center`}
			>
				<a
					data-sveltekit-preload-data
					href={item.path}
					class={`l:flex ravioli:2xs align:center ${font}`}
				>
					{#if i === items.length - 1}
						<svelte:element
							this={`h${level}`}
							id={title}
							class="l:flex align:center"
						>
							{item.title}
						</svelte:element>
					{:else}
						{item.title}
					{/if}
				</a>
			</li>
		{/each}
	</ul>
	{#if breadcrumbTabs}
		{@render breadcrumbTabs()}
	{/if}
</nav>
