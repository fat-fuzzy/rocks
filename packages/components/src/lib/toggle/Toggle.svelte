<script>
	import {useMachine} from '@xstate/svelte'
	import {createMachine} from 'xstate'

	const toggleMachine = createMachine({
		id: 'toggle',
		initial: 'inactive',
		states: {
			inactive: {
				on: {TOGGLE: 'active'},
			},
			active: {
				on: {TOGGLE: 'inactive'},
			},
		},
	})

	const {state, send} = useMachine(toggleMachine)
</script>

<button type="button" on:click={() => send('TOGGLE')} aria-label="Toggle button">
	{$state.value === 'inactive' ? 'Click to activate' : 'Active! Click to deactivate'}
</button>
