<script lang="ts">
	type ButtonType = 'button' | 'submit' | 'reset' | null | undefined
	import {getStores} from '$app/stores'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	export let title = 'Log In'
	export let description = 'A log in form'
	export let asset = 'emoji:log'
	export let depth = 2 // <h*> elenent depth
	export let size = 'md'
	export let align = 'center'
	export let background = 'contrast'
	export let variant = 'default'
	export let color = 'primary'

	export let redirectTo: string = ''
	// export let action: string = '/login'
	export let action: string = ''
	let type: ButtonType = 'button'

	let page = getStores().page

	$: session = {...$page.data.session}
	$: action = redirectTo ? `/${action}?redirectTo=${redirectTo}` : action
	$: type = action ? 'submit' : 'button'
</script>

{#if session.user}
	<slot name="authed" />
{:else}
	<!-- <section class={`l:text:${size} l:center:${size} card:xl ${background}`}> -->
	<form method="POST" class={`l:stack:${size} card:${size} ${background}`} {action}>
		<header class={`l:stack:${size} text:${align} ${asset}`}>
			<svelte:element this={`h${depth}`}>{title}</svelte:element>
			<p class={`font:${size}`}>{description}</p>
		</header>
		<label class={`l:stack:${size}`}>
			Email
			<input id="email" type="text" name="email" required />
		</label>
		<label class={`l:stack:${size}`}>
			Password
			<input id="password" type="password" name="password" required />
		</label>
		<Button {type} {variant} {color} onClick={() => {}}>Log In</Button>
	</form>
	<!-- </section> -->
{/if}
