<script lang="ts">
	import {onDestroy} from 'svelte'
	import {getStores} from '$app/stores'
	import {clickOutside} from '$lib/utils/click-outside'
	import {lang} from '$stores/intl'
	import * as settings from '$lib/stores/settings'

	import Expand from '$lib/components/blocks/buttons/Expand.svelte'
	import Settings from '$lib/components/compositions/forms/Settings.svelte'

	export let className = 'header-app'
	export let breakpoint = 'xxl'
	export let background = ''
	export let id = 'ui'

	let page = getStores().page
	export let items = {
		main: [{slug: 'about', title: 'About'}],
		side: [
			{
				id: 'button-theme',
				title: 'Theme',
				action: 'theme',
				asset: 'emoji', // Fix asset per theme
				variant: 'outline',
				shape: 'round',
				color: 'primary',
				size: 'xl',
			},
			{
				id: 'link-github',
				title: 'GitHub icon',
				url: 'https://github.com/fat-fuzzy/rocks',
				asset: 'svg', // Fix asset per theme
				shape: 'round',
				size: 'md',
			},
			// {
			// 	id: 'menu-lang',
			// 	title: 'Lang',
			// 	asset: langMenuIcon,
			// 	type: 'emoji',
			// 	// TODO: figure out a better way to [name / deal with] submenu items - see LinkList component
			// 	subitems: languages.map((l) => ({
			// 		id: l.code,
			// 		title: l.title,
			// 		action: setLanguage,
			// 		asset: langEmojis[l.code],
			// 		type: 'emoji',
			// 	})),
			// },
		],
	}

	let appSettings: {[key: string]: string} = {brightness: 'day', contrast: 'night'}

	const stores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
	]

	let navExpanded = false

	function handleClickOutsideMainNav(event) {
		navExpanded = false
	}

	function toggleNav(event) {
		navExpanded = !navExpanded
	}

	function setLanguage(event) {
		lang.set(event.detail.payload)
	}

	$: brightness = appSettings.brightness
	$: contrast = appSettings.contrast
	$: headerClass = `${className} l:sidebar:md layer sticky:top bg:${background} ${brightness} ${contrast} justify:start`
	$: show = background ? `bg:${background} show` : 'show'
	$: showNav = navExpanded ? show : 'hide:viz-only'
	$: revealClasses = 'form:expand'

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<header class={headerClass}>
	<div
		class={`l:main:50 l:reveal:auto bp:${breakpoint} ${revealClasses}`}
		use:clickOutside
		on:clickOutside={handleClickOutsideMainNav}
	>
		<Expand
			id={`${id}-settings-settings-button`}
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
		<nav id={`${id}-primary-nav`} class={showNav}>
			<ul class="l:switcher:sm bp:xxs">
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a data-sveltekit-preload-data href="/" on:click={handleClickOutsideMainNav}>Home</a>
				</li>
				{#each items.main as { slug, title }}
					<li aria-current={$page.url.pathname.startsWith(`/${slug}`) ? 'page' : undefined}>
						<a data-sveltekit-preload-data href={`/${slug}`} on:click={handleClickOutsideMainNav}>
							{title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<Settings path={$page.url.pathname} layout="side" {breakpoint} align="end" size="sm" />
</header>
