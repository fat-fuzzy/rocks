<script lang="ts">
	import {page} from '$app/stores'
	// import logo from './svelte-logo.svg'

	let actionsMenuExpanded = false

	function toggleActionsMenu(event) {
		actionsMenuExpanded = !actionsMenuExpanded
	}

	$: actionsMenuClass = actionsMenuExpanded ? 'l-switcher md' : 'l-switcher md collapsed'
</script>

<header class="l-sidebar u-main layer">
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
		<button class="toggle" aria-expanded={actionsMenuExpanded} on:click={toggleActionsMenu}>
			Toggle Actions
		</button>
		<form class={actionsMenuClass}>
			<p>Login</p>
			<p>Language</p>
			<p>Dark / Light</p>
		</form>
	</div>
</header>
