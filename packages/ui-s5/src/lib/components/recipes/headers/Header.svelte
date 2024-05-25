<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {getStores} from '$app/stores'

	import {lang} from '$stores/intl.js'
	import * as settings from '$stores/settings.js'

	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import Settings from '$lib/components/recipes/forms/Settings.svelte'
	import type {HeaderProps} from './header.types.js'
	import type {ExpandPayload} from '$lib/components/blocks/buttons/Expand/expand.types.js'

	let {
		id = 'header-app',
		title = 'App navigation',
		method = 'POST',
		breakpoint = 'xxl',
		background,
		formaction,
		actionPath,
		redirect,
		items,
		children,
	}: HeaderProps = $props()
	let className = 'header-app'

	let page = getStores().page

	let navReveal: {[key: string]: string} = {reveal: ''}
	let appSettings: {[key: string]: string} = {brightness: '', contrast: ''}

	const stores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
		settings.navReveal.subscribe((value) => {
			if (value) {
				navReveal = value
			}
		}),
	]

	function handleClickOutsideMainNav() {
		settings.navReveal.set({reveal: 'minimize'})
	}

	function toggleNav(payload: ExpandPayload) {
		const updated = payload.expanded ? 'show' : 'minimize'
		settings.navReveal.set({reveal: updated})
	}

	function setLanguage(event: CustomEvent) {
		lang.set(event.detail.payload)
	}

	let reveal = $state(navReveal.reveal)
	let contrast = $state(appSettings.contrast)
	let headerClass = `${className} l:sidebar:xl layer sticky:top justify:start bg:${contrast}`
	let showBackground = background ? `bg:${background}` : 'bg:inherit'
	let show = `show ${showBackground}`
	let showNav = reveal === 'show' ? show : 'hide:viz-only'
	let navClasses = `l:switcher:xxs ${showBackground}`
	let revealClasses = `form:expand card:md`
	let layoutClasses = `l:main:50 l:reveal:auto bp:${breakpoint}`

	let action =
		formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<header class={headerClass}>
	<div class={layoutClasses}>
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
				size="sm"
				title="Menu"
				name={`button-${id}-nav-reveal`}
				type={actionPath && formaction ? 'submit' : 'button'}
				controls={`${id}-primary-nav`}
				value={'menu'}
				states={{
					expanded: {
						id: 'menu-expanded',
						text: 'menu',
						value: 'show',
						asset: 'emoji:menu',
					},
					collapsed: {
						id: 'menu-collapsed',
						text: 'menu',
						value: 'minimize',
						asset: 'emoji:menu',
					},
				}}
				onclick={toggleNav}
			>
				Menu
			</Expand>
		</form>
		<nav id={`${id}-primary-nav`} class={showNav} aria-label={title}>
			<ul class={navClasses}>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a
						data-sveltekit-preload-data
						href="/"
						onclick={handleClickOutsideMainNav}>Home</a
					>
				</li>
				{#each items.links as { slug, title }}
					<li
						aria-current={$page.url.pathname.startsWith(`/${slug}`)
							? 'page'
							: undefined}
					>
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
	</div>
	<Settings
		path={$page.url.pathname}
		{breakpoint}
		align="end"
		size="sm"
		id={`${id}-menu-settings`}
		{formaction}
		{actionPath}
		redirect={$page.url.pathname}
		items={items.settings}
	/>
</header>
