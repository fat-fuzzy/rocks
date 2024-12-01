<script lang="ts">
	import type {HeaderProps} from '$types'
	import SkipLinks from '$lib/components/blocks/global/SkipLinks.svelte'
	import Reveal from '$lib/components/layouts/Reveal.svelte'
	import Settings from '$lib/components/recipes/header/Settings.svelte'

	let {
		id = 'header-app',
		breakpoint = 'sm',
		path,
		formaction,
		items,
	}: HeaderProps = $props()
	let className = 'header-app'

	let navReveal: {[key: string]: string} = $state({reveal: ''})

	function handleClickOutsideMainNav() {
		navReveal = {reveal: 'collapsed'}
	}

	let reveal = $derived(navReveal.reveal)
	let headerClass = $derived(`${className} l:flex sticky:top justify:start`)
</script>

<header class={headerClass}>
	<div class="l:main">
		<SkipLinks />
		<Reveal
			{id}
			name={id}
			label=""
			element="nav"
			title="Menu"
			size="xs"
			variant="outline"
			asset="home"
			justify="start"
			auto={true}
			{reveal}
			{breakpoint}
			{formaction}
		>
			<ul class="l:switcher:sm">
				<li aria-current={path === '/' ? 'page' : undefined}>
					<a
						data-sveltekit-preload-data
						href="/"
						onclick={handleClickOutsideMainNav}>Home</a
					>
				</li>
				{#each items.links as { slug, title }}
					<li aria-current={path?.startsWith(`/${slug}`) ? 'page' : undefined}>
						<a
							data-sveltekit-preload-data
							href={`/${slug}`}
							onclick={handleClickOutsideMainNav}
						>
							{title}
						</a>
					</li>
				{/each}
			</ul>
		</Reveal>
	</div>
	<div class="l:side">
		<Settings
			name={`${id}-settings`}
			label=""
			{path}
			{breakpoint}
			align="end"
			size="xs"
			id={`${id}-menu-settings`}
			items={items.settings}
			onupdate={items?.settings.onupdate}
		/>
	</div>
</header>
