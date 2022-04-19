<script lang="ts">
	import {createMachine} from 'xstate'
	import {useMachine} from '@xstate/svelte'
	import machineConfig from './machineConfig'
	import initMachineOptions, {Events} from './initMachineOptions'
	import Fieldset from '$lib/form/Fieldset.svelte'

	export let size = 'md'
	let emailInput
	let passwordInput
	let submitButton
	let resetPassword = false

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

	const handleResetForm = () => {
		send({
			type: Events.INPUT_EMAIL,
			email: '',
		})
		send({
			type: Events.INPUT_PASSWORD,
			password: '',
		})
	}

	const handleEmailChange = (event) => {
		send({
			type: Events.INPUT_EMAIL,
			email: event.target.value,
		})
	}

	const handlePasswordChange = (event) => {
		send({
			type: Events.INPUT_PASSWORD,
			password: event.target.value,
		})
	}

	const handleSubmit = (event) => {
		send({
			type: Events.SUBMIT,
		})
	}

	const handleLogout = (event) => {
		send({
			type: Events.LOGOUT,
		})
		handleResetForm()
	}

	const handleResetButtonAction = (event) => {
		if (forgotPassword) {
			send({
				type: Events.RESET_PASSWORD,
				email: event.target.value,
			})
		} else {
			send({
				type: Events.FORGOT_PASSWORD,
			})
		}
	}

	const handleCancel = (event) => {
		send({
			type: Events.CANCEL,
		})
		if (!loading) {
			handleResetForm()
		}
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
	$: isNoEmail =
		$state.matches('loggedOut.email.error.empty') ||
		$state.matches('forgotPassword.email.error.empty')
	$: isEmailBadFormat =
		$state.matches('loggedOut.email.error.badFormat') ||
		$state.matches('forgotPassword.email.error.badFormat')
	$: isNoPassword = $state.matches('loggedOut.password.error.empty')
	$: isLoggedIn = $state.matches('loggedIn')
	$: isPasswordShort = $state.matches('loggedOut.password.error.tooShort')
	$: isLoginFailed = $state.matches('loggedOut.authService.error.login')
	$: isNoResponseSignIn = $state.matches('loggedOut.authService.error.communication')
	$: isNoResponseReset = $state.matches('resetPassword.authService.error.communication')
	$: errPassword = isNoPassword || isPasswordShort
	$: errEmail = isNoEmail || isEmailBadFormat

	$: loading = $state.matches('loading')
	$: resetPassword = $state.matches('resetPassword')
	$: forgotPassword = $state.matches('forgotPassword')
	$: showPasswordInput = !resetPassword && !forgotPassword
	$: resetButtonLabel = showPasswordInput ? 'Forgot password' : 'Reset password'

	$: emailInputClass = errEmail ? 'error' : ''
	$: passwordInputClass = errPassword ? 'error' : ''
	$: resetButtonClass = showPasswordInput ? 'link' : 'primary'
	$: feedbackClass =
		errEmail || errPassword || isLoginFailed || isNoResponseSignIn || isNoResponseReset
			? 'error'
			: ''
</script>

<Fieldset slug="signIn" label="Sign In" {size}>
	{#if !isLoggedIn}
		<label for="email"> Email </label>
		<input
			id="email"
			type="text"
			value={email}
			class={emailInputClass}
			disabled={loading || resetPassword}
			bind:this={emailInput}
			on:change={handleEmailChange}
		/>
		<div class="feedback {feedbackClass}">
			{#if isNoEmail} <p>Please enter your email</p>{/if}
			{#if isEmailBadFormat} <p>Please enter a valid email</p>{/if}
			{#if isNoResponseReset} <p>Reset failed: please try again later</p>{/if}
		</div>

		{#if showPasswordInput}
			<label for="password"> Password </label>
			<input
				id="password"
				type="password"
				value={password}
				class={passwordInputClass}
				disabled={loading}
				bind:this={passwordInput}
				on:change={handlePasswordChange}
			/>
			<div class="feedback {feedbackClass}">
				{#if isNoPassword} <p>Please fill in your password</p>{/if}
				{#if isPasswordShort}
					<!-- TODO: This error should only appear in SignUp form --->
					<p>Password length is too short</p>
				{/if}
				{#if isLoginFailed} <p>Login failed: invalid email or password</p>{/if}
				{#if isNoResponseSignIn} <p>Login failed: please try again later</p>{/if}
			</div>
			<button
				type="submit"
				class="primary"
				disabled={loading || errPassword || errEmail}
				bind:this={submitButton}
				on:click|preventDefault={handleSubmit}
			>
				Sign In
			</button>
		{/if}
		<button
			type="button"
			class={resetButtonClass}
			disabled={loading || resetPassword || errEmail}
			on:click|preventDefault={handleResetButtonAction}
		>
			{resetButtonLabel}
		</button>
		<button type="button" on:click|preventDefault={handleCancel}> Cancel </button>
	{/if}

	{#if isLoggedIn}
		<h2>Welcome!</h2>
		<button type="button" on:click|preventDefault={handleLogout}> Logout </button>
	{/if}
</Fieldset>

<style lang="scss" global>
	@import '../../styles/main.scss';
</style>
