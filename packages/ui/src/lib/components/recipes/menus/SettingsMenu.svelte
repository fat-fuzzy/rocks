<script lang="ts">
	import type {SettingsMenuProps} from '$types'
	import {enhance} from '$app/forms'
	import {SWITCH_MACHINE} from '$lib/components/blocks/buttons/Switch/definitions.js'
	import Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'

	let {
		id = 'ui-settings-menu',
		method = 'POST',
		background,
		color = 'primary',
		formaction,
		items,
		onupdate,
	}: SettingsMenuProps = $props()

	let settingsId = id

	function handleUpdate(payload) {
		if (onupdate) onupdate(payload)
	}

	let showBackground = background
		? `bg:${background}`
		: !color
			? 'bg:inherit'
			: ''
	let formClasses = `l:flex nowrap ${showBackground}`
</script>

<form
	name="settings-update"
	{method}
	action={`?/${formaction}`}
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({update}) => {
			update({reset: false})
		}
	}}
	class={`menu:settings ${formClasses}`}
>
	{#each items as { id, name, title, initial, variant, shape, color, size, value, states }}
		{@const switchStates = states ? states : SWITCH_MACHINE}
		<Switch
			id={`${settingsId}-${id}`}
			{name}
			{title}
			{variant}
			{shape}
			{color}
			{size}
			{value}
			{initial}
			states={switchStates}
			onclick={handleUpdate}
		/>
	{/each}
</form>
