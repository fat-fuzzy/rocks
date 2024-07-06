<script lang="ts">
	import {enhance} from '$app/forms'

	import SkipLinks from '$lib/components/blocks/global/SkipLinks.svelte'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/expand.types.js'
	import Settings from '$lib/components/recipes/forms/Settings.svelte'
	import type {HeaderProps} from './header.types.js'
	import type {FuzzyPayload} from '$types/machines.js'

	let {
		id = 'header-app',
		title = 'App navigation',
		method = 'POST',
		breakpoint = '2xl',
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

	function toggleNav(payload: FuzzyPayload) {
		const updated = payload.state
		navReveal = {reveal: updated}
	}

	let brightness = $derived(app.settings.brightness)
	let contrast = $derived(app.settings.contrast)
	let reveal = $derived(navReveal.reveal)
	let headerClass = $derived(
		`${className} l:sidebar:xl layer sticky:top justify:start settings:${brightness}:${contrast}`,
	)
	let showNav = $derived(reveal === 'expanded' ? 'expanded' : 'hide:viz-only')
	let navClasses = $derived(`l:switcher:2xs ${showNav}`)
	let revealClasses = `form:expand card:md`
	let layoutClasses = `l:main:50 l:reveal:auto bp:${breakpoint}`

	let action =
		formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction
</script>

<header class={headerClass}>
	<SkipLinks />
	<nav id={`${id}-primary-nav`} class={layoutClasses} aria-label={title}>
		<form
			name="nav-reveal"
			{method}
			action={action && actionPath ? `${actionPath}?/${action}` : `?/${action}`}
			use:enhance={() => {
				// prevent default callback from resetting the form
				return ({update}) => {
					update({reset: false})
				}
			}}
			class={revealClasses}
		>
			<Expand
				id={`header-button-expand-${id}`}
				variant="outline"
				size="xs"
				title="Menu"
				name={`button-${id}-nav-reveal`}
				type={actionPath && formaction ? 'submit' : 'button'}
				controls={`${id}-primary-nav`}
				value={'menu'}
				asset="menu"
				text="Menu"
				onclick={toggleNav}
				states={EXPAND_MACHINE}
			>
				Menu
			</Expand>
		</form>
		<ul class={navClasses}>
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
	</nav>
	<Settings
		{path}
		{breakpoint}
		align="end"
		size="xs"
		id={`${id}-menu-settings`}
		{formaction}
		{actionPath}
		redirect={path}
		items={items.settings}
		onupdate={items.settings.onupdate}
	/>
</header>
