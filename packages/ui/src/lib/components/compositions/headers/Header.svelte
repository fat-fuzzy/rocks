<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {getStores} from '$app/stores'

	import {clickOutside} from '$lib/utils/click-outside'
	import {lang} from '$stores/intl'
	import * as settings from '$stores/settings'
	import constants from '$lib/types/constants'

	import Expand from '$lib/components/blocks/buttons/Expand.svelte'
	import Settings from '$lib/components/compositions/forms/Settings.svelte'

	const method = 'POST'
	export let title = 'Header navigation'
	export let className = 'header-app'
	export let breakpoint = 'xxl'
	export let background = ''
	export let size = 'sm'
	export let id = 'ui'
	export let formaction: string | undefined = undefined
	export let actionPath: string | undefined = undefined
	export let redirect: string | undefined = undefined
	const {DEFAULT_SETTINGS} = constants
	export let items = {links: [{slug: 'about', title: 'About'}], settings: DEFAULT_SETTINGS}

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

	function toggleNav(event: CustomEvent) {
		const updated = event.detail.expanded ? 'show' : 'minimize'
		settings.navReveal.set({reveal: updated})
	}

	function setLanguage(event: CustomEvent) {
		lang.set(event.detail.payload)
	}

	$: reveal = navReveal.reveal
	$: contrast = appSettings.contrast
	$: headerClass = `${className} l:sidebar:xl layer sticky:top justify:start bg:${contrast}`
	$: showBackground = background ? `bg:${background}` : 'bg:inherit'
	$: show = `show ${showBackground}`
	$: showNav = reveal === 'show' ? show : 'hide:viz-only'
	$: navClasses = `l:switcher:xxs ${showBackground}`
	$: revealClasses = `form:expand card:md`
	$: layoutClasses = `l:main:50 l:reveal:auto bp:${breakpoint}`

	$: action = formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<header class={headerClass}>
	<div class={layoutClasses} use:clickOutside on:clickOutside={handleClickOutsideMainNav}>
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
				id={`button-${id}-nav-reveal`}
				variant="outline"
				size="sm"
				title="Menu"
				name={`button-${id}-nav-reveal`}
				type={actionPath && formaction ? 'submit' : 'button'}
				controls={`${id}-primary-nav`}
				value={'menu'}
				states={{
					active: {text: 'menu', value: 'show', asset: 'emoji:menu'},
					inactive: {text: 'menu', value: 'minimize', asset: 'emoji:menu'},
				}}
				on:click={toggleNav}
			>
				Menu
			</Expand>
		</form>
		<nav id={`${id}-primary-nav`} class={showNav} aria-label={title}>
			<ul class={navClasses}>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a data-sveltekit-preload-data href="/" on:click={handleClickOutsideMainNav}>Home</a>
				</li>
				{#each items.links as { slug, title }}
					<li aria-current={$page.url.pathname.startsWith(`/${slug}`) ? 'page' : undefined}>
						<a data-sveltekit-preload-data href={`/${slug}`} on:click={handleClickOutsideMainNav}>
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
