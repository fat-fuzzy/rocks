<script lang="ts">
	import {page} from '$app/stores'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	export let title = 'Log In'
	export let description = 'A log in form'
	export let asset = '🪵'
	export let depth = 2 // <h*> elenent depth
	export let size = 'md'
	export let assetSize = 'xl'
	export let align = 'center'
	export let background = 'contrast'
	export let variant = 'default'
	export let color = 'primary'

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
	<section class={`l:text:${size} l:center card:xl ${background}`}>
		<header class={`l:stack:${size} text:${align}`}>
			<p class={`font:${assetSize}`}>{asset}</p>
			<svelte:element this={`h${depth}`}>{title}</svelte:element>
			<p class={`font:${size}`}>{description}</p>
		</header>
		<form method="POST" class={`l:stack:${size} card:${size}`} {action}>
			<label for="email">Email</label>
			<input id="email" type="text" name="email" />
			<label for="password">Password</label>
			<input id="password" type="password" name="password" />
			<Button {type} {variant} {color}>Log In</Button>
		</form>
	</section>
{/if}
