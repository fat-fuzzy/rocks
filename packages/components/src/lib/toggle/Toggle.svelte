<script>
	import {useMachine} from '@xstate/svelte'
	import toggleMachine from './machineConfig'

	import Fieldset from '../Fieldset.svelte'

	const {state, send} = useMachine(toggleMachine)
</script>

<Fieldset slug="toggle" label="Toggle" size="sm">
	<button type="button" on:click={() => send('TOGGLE')} aria-label="Toggle button">
		{$state.value === 'inactive' ? 'Click to activate' : 'Active! Click to deactivate'}
	</button>
</Fieldset>
