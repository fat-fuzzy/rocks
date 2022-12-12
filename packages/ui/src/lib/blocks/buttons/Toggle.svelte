<script lang="ts">
	import {useMachine} from '@xstate/svelte'
	import toggleMachine from '$lib/machines/toggle/machineConfig'

	import Fieldset from '../forms/Fieldset.svelte'

	export let size = ''
	const {state, send} = useMachine(toggleMachine)
	$: pressed = $state.value === 'active'
	$: toggleClass = pressed ? 'outline accent' : 'primary accent' /* TODO: use aria state to style*/
	$: stateClass = pressed ? 'primary accent' : 'outline accent' /* TODO: use aria state to style*/
</script>

<Fieldset slug="toggle" legend="Toggle" {size}>
	<button
		type="button"
		on:click={() => send('TOGGLE')}
		aria-pressed={pressed}
		class={`${toggleClass}`}
	>
		Toggle
		<span class={`${stateClass}`}>{pressed ? 'ON' : 'OFF'} </span>
	</button>
</Fieldset>

<style>
	/* TODO  Move Toggle styles to lib */
	button {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	button.primary:hover span {
		color: var(--ui-color-white);
		background-color: var(--ui-accent);
	}
	span {
		padding: 0.25em 0.5em;
		border-radius: var(--ui-radius-lg);
	}
</style>
