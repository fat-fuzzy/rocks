<script lang="ts">
	import SkipLinks from '$lib/components/blocks/global/SkipLinks.svelte'
	import Settings from '$lib/components/recipes/forms/Settings.svelte'
	import RevealAuto from '$lib/components/layouts/RevealAuto.svelte'
	import type {HeaderProps} from './header.types.js'

	let {
		id = 'header-app',
		breakpoint = 'md',
		path,
		formaction,
		actionPath,
		redirect,
		items,
		app,
	}: HeaderProps = $props()
	let className = 'header-app'

	let navReveal: {[key: string]: string} = $state({reveal: ''})

	function handleClickOutsideMainNav() {
		navReveal = {reveal: 'collapsed'}
	}

	let brightness = $derived(app.settings.brightness)
	let contrast = $derived(app.settings.contrast)
	let reveal = $derived(navReveal.reveal)
	let headerClass = $derived(
		`${className} l:sidebar layer:2 sticky:top justify:start settings:${brightness}:${contrast}`,
	)
</script>

<header class={headerClass}>
	<div class="l:main">
		<SkipLinks />
		<RevealAuto
			id={`${id}-primary-nav`}
			element="nav"
			layout="main"
			title="Menu"
			size="xs"
			variant="outline"
			asset="home"
			justify="start"
			{reveal}
			{breakpoint}
			{formaction}
			{redirect}
			{actionPath}
		>
			<ul class="l:switcher:md">
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
		</RevealAuto>
	</div>
	<Settings
		{path}
		{breakpoint}
		align="end"
		size="xs"
		id={`${id}-menu-settings`}
		{formaction}
		{actionPath}
		{redirect}
		items={items.settings}
		onupdate={items?.settings.onupdate}
	/>
</header>
