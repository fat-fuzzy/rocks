<script lang="ts">
	import {page} from '$app/stores'
	// import logo from './svelte-logo.svg'

	let actionsMenuExpanded = false

	function toggleActionsMenu(event) {
		actionsMenuExpanded = !actionsMenuExpanded
	}

	$: actionsMenuClass = actionsMenuExpanded ? 'menu l-switcher md' : 'menu l-switcher md collapsed'
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
		<form class="sm">
			<button
				type="button"
				class="toggle primary"
				aria-expanded={actionsMenuExpanded}
				on:click={toggleActionsMenu}
			>
				Settings
			</button>
			<menu class={actionsMenuClass}>
				<button>Lang</button>
				<button>Color</button>
				<button>Login</button>
			</menu>
		</form>
	</div>
</header>
