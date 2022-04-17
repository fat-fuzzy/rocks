<script lang="ts">
	import {createMachine} from 'xstate'
	import {useMachine} from '@xstate/svelte'
	import machineConfig from './machineConfig'
	import initMachineOptions from './initMachineOptions'

	let emailInput
	let passwordInput
	let submitButton
	let cancelButton
	let resetButton

	const delay = (func) => setTimeout(() => func())

	/***
	 * ACTIONS:
	 * - focusEmailInput
	 * - focusPasswordInput
	 * - focusSubmitBtn
	 * - cacheEmail
	 * - cachePassword
	 * - onAuthentication
	 */

	const handleEmailInputFocus = () => {
		delay(() => emailInput.focus())
	}
	const handlePasswordInputFocus = () => {
		delay(() => passwordInput.focus())
	}
	const handleSubmitButtonFocus = () => {
		delay(() => submitButton.focus())
	}

	const handleEmailChange = (event) => {
		send({
			type: 'INPUT_EMAIL',
			email: event.target.value,
		})
	}

	const handlePasswordChange = (event) => {
		send({
			type: 'INPUT_PASSWORD',
			password: event.target.value,
		})
	}

	const handleSubmit = (event) => {
		send({
			type: 'SUBMIT',
		})
	}

	const handleReset = (event) => {
		send({
			type: 'RESET',
		})
	}

	const handleCancel = (event) => {
		send({
			type: 'CANCEL',
		})
	}

	const machineOptions = initMachineOptions({
		handleEmailInputFocus,
		handlePasswordInputFocus,
		handleSubmitButtonFocus,
	})
	const signInMachine = createMachine(machineConfig)

	const {state, send} = useMachine(signInMachine, machineOptions)

	$: email = $state.context.email
	$: password = $state.context.password

	$: isNoEmail = $state.matches('loggedOut.email.error.empty')
	$: isEmailBadFormat = $state.matches('loggedOut.email.error.badFormat')
	$: isNoPassword = $state.matches('loggedOut.password.error.empty')
	$: isPasswordShort = $state.matches('loggedOut.password.error.tooShort')
	$: isLoginFailed = $state.matches('loggedOut.authService.error.login')
	$: errPassword = isNoPassword || isPasswordShort
	$: errEmail = isNoEmail || isEmailBadFormat
	$: errForm = isLoginFailed

	$: emailInputClass = errEmail ? 'error' : ''
	$: passwordInputClass = errPassword ? 'error' : ''
	$: loading = $state.matches('loading')
</script>

<label for="email"> Email </label>
<input
	id="email"
	type="text"
	value={email}
	class={emailInputClass}
	bind:this={emailInput}
	on:change={handleEmailChange}
/>
{#if errEmail}
	<small class="error">
		{#if isNoEmail} <p>Please fill in your email</p>{/if}
		{#if isEmailBadFormat} <p>Please check your email</p>{/if}
	</small>
{/if}
<label for="password"> Password </label>
<input
	id="password"
	type="password"
	value={password}
	class={passwordInputClass}
	bind:this={passwordInput}
	on:change={handlePasswordChange}
/>
{#if errPassword}
	<small class="error">
		{#if isNoPassword} <p>Please fill in your password</p>{/if}
		{#if isEmailBadFormat} <p>Password length is too short</p>{/if}
	</small>
{/if}
{#if errForm}
	<small class="error">
		{#if isLoginFailed} <p>Login failed. Invalid user ID or password.</p>{/if}
	</small>
{/if}
<button
	type="submit"
	disabled={loading}
	bind:this={submitButton}
	on:click|preventDefault={handleSubmit}
>
	Sign In
</button>
<button type="button" bind:this={cancelButton} on:click|preventDefault={handleCancel}>
	Cancel
</button>
<button
	type="button"
	disabled={loading}
	bind:this={resetButton}
	on:click|preventDefault={handleReset}
>
	Forgot password
</button>

<style lang="scss">
	input {
		min-width: 44ch; // anticipate error message length
	}
</style>
