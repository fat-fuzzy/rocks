<script lang="ts">
	import {getStores} from '$app/stores'
	import Button from '$lib/components/blocks/buttons/Button.svelte'

	// export let action: string = '/login'
	export let action: string = ''
	export let redirectTo: string = ''
	export let title = 'Log In'
	export let description = 'A log in form'
	export let asset = 'log'
	export let depth = 2 // <h*> elenent depth
	export let size = 'md'
	export let align = 'center'
	export let background = 'contrast'
	export let variant = 'default'
	export let color = 'primary'

	let page = getStores().page
	let type = 'button'

	$: session = {...$page.data.session}
	$: action = redirectTo ? `/${action}?redirectTo=${redirectTo}` : action
	$: type = action ? 'submit' : 'button'
</script>

{#if session.user}
	<slot name="authed" />
{:else}
	<div class={`card:${size} ${background}`}>
		<form method="POST" class={`l:stack:${size} card:${size}`} {action}>
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
			<Button
				id="button-submit-login"
				{type}
				{variant}
				{color}
				onClick={() => {}}>Submit</Button
			>
		</form>
	</div>
{/if}
