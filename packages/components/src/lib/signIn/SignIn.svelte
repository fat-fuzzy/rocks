<script lang="ts">
	import {createMachine} from 'xstate'
	import {useMachine} from '@xstate/svelte'
	import machineConfig from './machineConfig'
	import initMachineOptions from './initMachineOptions'

	let emailInput
	let passwordInput
	let submitButton
	let cancelButton

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
		console.log(event)
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
		console.log(event)
		send({
			type: 'SUBMIT',
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
</script>

<input type="text" value={email} bind:this={emailInput} on:change={handleEmailChange} />
<input
	type="password"
	value={password}
	bind:this={passwordInput}
	on:change={handlePasswordChange}
/>
<button type="button" bind:this={cancelButton} on:click|preventDefault={handleCancel}>
	Cancel
</button>
<button type="submit" bind:this={submitButton} on:click|preventDefault={handleSubmit}>
	Sign In
</button>

<style lang="scss">
	@import '../../styles/common/form.scss';
	@import '../../styles/common/input.scss';
</style>
