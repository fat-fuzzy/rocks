<script lang="ts">
	import {page} from '$app/stores'
	export let title = 'Log In'
	export let description = 'A log in form'
	export let asset = '🪵'
	export let depth = 2 // <h*> elenent depth
	export let size = 'md'
	export let assetSize = 'xl'
	export let align = 'center'

	export let redirectTo: string = ''
	// export let action: string = '/login'
	export let action: string = ''

	$: session = {...$page.data.session}
	$: action = redirectTo ? `/${action}?redirectTo=${redirectTo}` : action
	$: type = action ? 'submit' : 'button'
</script>

{#if session.user}
	<slot name="authed" />
{:else}
	<section class={`l:text:${size} l:center card:lg`}>
		<header class={`l:stack:${size} text:${align}`}>
			<p class={`font:${assetSize}`}>{asset}</p>
			<svelte:element this={`h${depth}`}>{title}</svelte:element>
			<p class={`font:${size}`}>{description}</p>
		</header>
		<form method="POST" class={`l:stack:${size}`} {action}>
			<label for="email">Email</label>
			<input id="email" type="text" name="email" />
			<label for="password">Password</label>
			<input id="password" type="password" name="password" />
			<button {type} class="primary">Log In</button>
		</form>
	</section>
{/if}
