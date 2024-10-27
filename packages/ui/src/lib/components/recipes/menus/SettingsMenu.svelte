<script lang="ts">
	import type {SettingsMenuProps} from '$types'
	import constants from '$lib/types/constants.js'
	import {SWITCH_MACHINE} from '$lib/components/blocks/buttons/Switch/definitions.js'
	import Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'

	const {DEFAULT_APP_SETTINGS} = constants

	let {
		id = 'settings',
		method = 'GET',
		background,
		color = 'primary',
		actionPath,
		redirect,
		items,
		onupdate,
	}: SettingsMenuProps = $props()

	let settingsId = id
	let appSettings = $state(DEFAULT_APP_SETTINGS)

	function handleUpdate(payload) {
		switch (payload.id) {
			case 'brightness':
				appSettings.brightness = payload.value
				break
			case 'contrast':
				appSettings.contrast = payload.value
				break
			default:
				break
		}
		if (onupdate) onupdate(payload)
	}

	let showBackground = background
		? `bg:${background}`
		: !color
			? 'bg:inherit'
			: ''
	let formClasses = `l:flex nowrap ${showBackground}`
	let settingsUpdateAction = $derived(
		redirect ? `updateSettings&redirectTo=${redirect}` : 'updateSettings',
	)

	// function initSettings(event) {
	// 	let preferredScheme = {...event}
	// 	switch (event.id) {
	// 		case 'brightness':
	// 			// TODO Fix this, not working
	// 			brightness = window.matchMedia('(prefers-color-scheme: dark)').matches
	// 				? 'night'
	// 				: 'day'
	// 			let state = brightness === 'day' ? 'inactive' : 'active'
	// 			let pressed = brightness === 'day' ? false : true
	// 			appSettings.brightness = brightness
	// 			preferredScheme.value = brightness
	// 			preferredScheme.state = state
	// 			preferredScheme.pressed = pressed
	// 			break
	// 		case 'contrast':
	// 			appSettings.contrast = event.value
	// 			break
	// 		default:
	// 			break
	// 	}
	// 	if (onupdate) onupdate(preferredScheme)
	// }
</script>

<form
	name="settings-update"
	{method}
	action={settingsUpdateAction && actionPath
		? `${actionPath}?/${settingsUpdateAction}`
		: `?/${settingsUpdateAction}`}
	class={`menu:settings ${formClasses}`}
>
	{#each items as { id, name, title, variant, shape, color, size, value, states }}
		{@const switchStates = states
			? {
					active: {
						...SWITCH_MACHINE.active,
						...states.active,
					},
					inactive: {
						...SWITCH_MACHINE.inactive,
						...states.inactive,
					},
				}
			: SWITCH_MACHINE}
		<div class="l:frame:round">
			<Switch
				id={`${settingsId}-${id}`}
				{name}
				{title}
				{variant}
				{shape}
				{color}
				{size}
				{value}
				states={switchStates}
				onclick={handleUpdate}
			/>
		</div>
	{/each}
</form>
