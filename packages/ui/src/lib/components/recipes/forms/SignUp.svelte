<script lang="ts">
	import type {InputProps} from '$lib/components/blocks/forms/input.types.js'
	import type { ButtonType } from '$lib/components/blocks/buttons/button.types.js'

	import {getStores} from '$app/stores'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import { onMount } from 'svelte'


	let {
		id,
		name,
		title = 'Log In',
		description = 'A log in form',
		value,
		validationFunction ='SignUpValidationFunction',
		formaction, // '/signup'
		redirectTo,
		items = [],
		layout,
		container,
		depth = 2, // <h*> elenent depth
		size,
		color = 'primary',
		variant = 'default',
		asset = 'log',
		align = 'center',
		background = 'contrast',
		onupdate,
		privateContent
	}: InputProps = $props()

	let page = getStores().page
	let fields = {
		email: '',
		password: '',
	}

	let session = {...$page.data.session}
	let action = $derived(redirectTo ? `/${formaction}?redirectTo=${redirectTo}` : formaction)
	let type: ButtonType = action ? 'submit' : 'button'

	onMount(async () => {
		// await validator.init(id, {fields, errors: []})
	})
</script>

{#if session.user}
	{@render privateContent()}
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
				id="button-submit-signup"
				{type}
				{variant}
				{color}
				name ='submit'
				onclick={() => {}}>Submit</Button
			>
		</form>
	</div>
{/if}
