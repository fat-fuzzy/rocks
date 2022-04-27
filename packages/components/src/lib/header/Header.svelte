<script lang="ts">
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import {theme, lang} from '../../stores'
	import {emojis} from '../../types/constants'
	// import logo from './svelte-logo.svg'

	export let className = ''
	let actionsMenuExpanded = false
	let currentTheme = $theme
	let currentLang = $lang
	let app

	function toggleActionsMenu(event) {
		actionsMenuExpanded = !actionsMenuExpanded
	}

	function toggleTheme(event) {
		const _theme = currentTheme === 'bg-light' ? 'bg-dark' : 'bg-light'
		theme.set(_theme)
	}
	function setLanguage(event) {
		lang.set(event.detail)
	}

	theme.subscribe((value) => {
		if (app) {
			app.classList.remove(currentTheme)
		}
		currentTheme = value
		if (app) {
			app.classList.add(currentTheme)
		}
	})

	lang.subscribe((value) => {
		currentLang = value
	})

	onMount(() => {
		app = document.getElementById('app')
		theme.set('bg-light')
	})

	$: mainMenuClass = `${className} l-sidebar u-main layer`
	$: actionsMenuClass = actionsMenuExpanded
		? `${currentTheme} menu l-switcher md show right`
		: `${currentTheme} menu l-switcher md hide`
	$: themeIcon = emojis[currentTheme]
	$: langIcon = emojis[currentLang]
</script>

<header class={mainMenuClass}>
	<nav class="l-sidebar-main">
		<ul class="l-wrapper">
			<li class:active={$page.url.pathname === '/'} class="home">
				<a sveltekit:prefetch href="/">
					<span class="l-square" alt="Home">🐣</span>
					Home
				</a>
			</li>
			<li class:active={$page.url.pathname === '/play'}>
				<a sveltekit:prefetch href="/play">Play</a>
			</li>
			<li class:active={$page.url.pathname === '/machines'}>
				<a sveltekit:prefetch href="/machines">Machines</a>
			</li>
		</ul>
	</nav>
	<div class="l-sidebar-side">
		<form class="dropdown sm">
			<button
				type="button"
				class="toggle collapse primary"
				aria-expanded={actionsMenuExpanded}
				on:click={toggleActionsMenu}
			>
				🎛 &nbsp;Settings
			</button>
			<menu class={actionsMenuClass}>
				<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>

				<!--button>Login</-button-->
				<div class="l-stack dropdown sm">
					<button type="button" on:click={setLanguage}>{langIcon}</button>
					<!-- <menu class={actionsMenuClass}>
						<button type="button" on:click={toggleTheme}>{themeIcon}&nbsp;&nbsp;Theme</button>
						<button type="button" on:click={setLanguage}>{langIcon}</button>
						<!--button>Login</-button -- >
					</menu> -->
				</div>
			</menu>
		</form>
	</div>
</header>
