<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {getStores} from '$app/stores'

	import {clickOutside} from '$lib/utils/click-outside'
	import {lang} from '$stores/intl'
	import * as settings from '$stores/settings'

	import Expand from '$lib/components/blocks/buttons/Expand.svelte'
	import Settings from '$lib/components/compositions/forms/Settings.svelte'

	const method = 'POST'
	export let className = 'header-app'
	export let breakpoint = 'xxl'
	export let background = ''
	export let id = 'ui'
	export let path: string | undefined = undefined

	let page = getStores().page
	export let links = [{slug: 'about', title: 'About'}]

	let appSettings: {[key: string]: string} = {brightness: '', contrast: ''}
	let navReveal: {[key: string]: string} = {reveal: ''}

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

	function handleClickOutsideMainNav(event) {
		settings.navReveal.set({reveal: 'minimize'})
	}

	function toggleNav(event) {
		const updated = event.detail.expanded ? 'show' : 'minimize'
		settings.navReveal.set({reveal: updated})
	}

	function setLanguage(event) {
		lang.set(event.detail.payload)
	}

	$: reveal = navReveal.reveal
	$: contrast = appSettings.contrast
	$: headerClass = `${className} l:sidebar:xl layer sticky:top justify:start bg:${contrast}`
	$: showBackground = background ? `bg:${background}` : 'bg:inherit'
	$: show = `show ${showBackground}`
	$: showNav = reveal === 'show' ? show : 'hide:viz-only'
	$: navClasses = `l:switcher:xxs ${showBackground}`
	$: revealClasses = `form:expand card:lg`
	$: layoutClasses = `l:main l:reveal:auto bp:${breakpoint}`

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<header class={headerClass}>
	<div class={layoutClasses} use:clickOutside on:clickOutside={handleClickOutsideMainNav}>
		<form
			name="nav-reveal"
			{method}
			action={`/?/toggleNav&redirectTo=${path}`}
			use:enhance={() => {
				// prevent default callback from resetting the form
				return ({update}) => {
					update({reset: false})
				}
			}}
			class={revealClasses}
		>
			<Expand
				id={`${id}-settings-button`}
				variant="outline"
				size="sm"
				title="Menu"
				name="reveal"
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
		<nav id={`${id}-primary-nav`} class={showNav}>
			<ul class={navClasses}>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a data-sveltekit-preload-data href="/" on:click={handleClickOutsideMainNav}>Home</a>
				</li>
				{#each links as { slug, title }}
					<li aria-current={$page.url.pathname.startsWith(`/${slug}`) ? 'page' : undefined}>
						<a data-sveltekit-preload-data href={`/${slug}`} on:click={handleClickOutsideMainNav}>
							{title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<Settings path={$page.url.pathname} {breakpoint} align="end" size="sm" />
</header>
