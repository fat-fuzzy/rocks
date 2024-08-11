<script lang="ts">
	import type {FormProps} from '$types'
	import {enhance} from '$app/forms'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import {onMount} from 'svelte'
	import AjvValidator from '$lib/utils/validate-ajv.svelte.js'

	let {
		id = 'sign-up-form',
		method = 'POST',
		title = 'Sign Up',
		description = 'A sample signup form',
		actionPath, // 'ui'
		formaction = 'signup', // 'signup'
		redirect,
		layout,
		container,
		depth = 2, // <h*> elenent depth
		size,
		color = 'primary',
		variant = 'default',
		asset = 'log',
		align = 'center',
		background = 'contrast',
	}: FormProps = $props()

	let boundForm: HTMLFormElement
	let formData: FormData
	let validator: AjvValidator | undefined = $state()
	let disabled: boolean | undefined = $state(undefined)

	let fields = $state({
		sample_email: '',
		sample_password: '',
		confirm_password: '',
	})

	let errors = $derived.by(() => ({
		sample_email: validator ? validator.getFieldErrors('sample_email') : [],
		sample_password: validator
			? validator.getFieldErrors('sample_password')
			: [],
		confirm_password: validator
			? validator.getFieldErrors('confirm_password')
			: [],
	}))

	let action = $derived(
		redirect ? `${formaction}&redirectTo=${redirect}` : formaction,
	)

	$effect(() => {
		disabled = validator && validator.errors.length > 0 ? true : undefined
	})

	function handleSubmit(e: Event) {
		if (validator) {
			validator.validate()
		}
	}

	function handleFocus(e: Event) {
		if (validator) {
			validator.touchInput(e)
		}
	}

	function handleBlur(e: Event) {
		if (validator) {
			validator.validateInput(e)
		}
	}

	function handleInput(e: Event) {
		if (validator) {
			validator.changeInput(e)
		}
	}

	onMount(async () => {
		if (boundForm) {
			formData = new FormData(boundForm)
			validator = new AjvValidator(formData, 'SignUpValidationFunction')
			validator.init(id)
		}
	})
</script>

<div class={`card:${size} ${background}`}>
	<form
		{method}
		class={`l:stack:${size} card:${size}`}
		action={action && actionPath ? `${actionPath}?/${action}` : `?/${action}`}
		use:enhance
		bind:this={boundForm}
		onsubmit={handleSubmit}
	>
		{#key validator}
			<header class={`l:stack:${size} text:${align} ${asset}`}>
				<svelte:element this={`h${depth}`}>{title}</svelte:element>
				<p class={`font:${size}`}>{description}</p>
			</header>
			<label class={`l:stack:${size}`}>
				Email
				<input
					id="email"
					type="email"
					name="sample_email"
					bind:value={fields.sample_email}
					required
					onfocus={handleFocus}
					onblur={handleBlur}
					oninput={handleInput}
				/>
				{#if errors.sample_email.length > 0}
					{#each errors.sample_email as error}
						<p class="error">{error}</p>
					{/each}
				{/if}
			</label>
			<label class={`l:stack:${size}`}>
				Password
				<input
					id="password"
					type="password"
					name="sample_password"
					bind:value={fields.sample_password}
					required
					onfocus={handleFocus}
					onblur={handleBlur}
					oninput={handleInput}
				/>
				{#if errors.sample_password.length > 0}
					{#each errors.sample_password as error}
						<p class="error">{error}</p>
					{/each}
				{/if}
			</label>
			<label class={`l:stack:${size}`}>
				Confirm Password
				<input
					id="password"
					type="password"
					name="confirm_password"
					bind:value={fields.confirm_password}
					required
					onfocus={handleFocus}
					onblur={handleBlur}
					oninput={handleInput}
				/>
				{#if errors.confirm_password.length > 0}
					{#each errors.confirm_password as error}
						<p class="error">{error}</p>
					{/each}
				{/if}
			</label>
			<Button
				id="button-submit-signup"
				{variant}
				{color}
				name="submit"
				{disabled}
			>
				Submit
			</Button>
		{/key}
	</form>
</div>
