<script lang="ts">
	import type {BreadcrumbProps} from '$types'
	let {
		id,
		title,
		layout = 'switcher',
		size,
		level,
		color,
		background,
		container,
		path,
		breadcrumbTabs,
	}: BreadcrumbProps = $props()

	let items: {slug: string; title: string}[] = $derived.by(() => {
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
	let backgroundClass = background ? `bg:${background}` : ''
	let colorClass = color ? `color:${color}` : ''
	let navClasses = `breadcrumb w:full l:flex justify:between ${colorClass} ${container}:${size} ${backgroundClass}`
</script>

<nav {id} class={navClasses}>
	<ul {id} class={`l:${layout}:${size} align:center unstyled`} data-testid={id}>
		{#each items as item, i}
			<li
				aria-current={path === item.slug ? 'page' : undefined}
				class="l:flex nowrap align:center"
			>
				{#if i > 0}
					<ff-icon role="presentation">➜</ff-icon>
				{/if}
				<a
					data-sveltekit-preload-data
					href={item.path}
					class="l:flex align:center"
				>
					{#if i === items.length - 1}
						<svelte:element
							this={`h${level}`}
							id={`${title}-${item.slug}`}
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
