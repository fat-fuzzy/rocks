<script>
	import {useMachine} from '@xstate/svelte'
	import toggleMachine from './machineConfig'
	const {state, send} = useMachine(toggleMachine)
</script>

<button type="button" on:click={() => send('TOGGLE')} aria-label="Toggle button">
	{$state.value === 'inactive' ? 'Click to activate' : 'Active! Click to deactivate'}
</button>
