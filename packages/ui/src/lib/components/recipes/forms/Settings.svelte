<script lang="ts">
	import type {SettingsProps} from '$types'
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants.js'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import {SWITCH_MACHINE} from '$lib/components/blocks/buttons/Switch/definitions.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'

	const {DEFAULT_APP_SETTINGS, DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'settings',
		method = 'POST',
		breakpoint = 'xs',
		background,
		layout,
		color = 'primary',
		size = 'sm',
		variant = 'outline',
		asset,
		align = 'end',
		formaction,
		actionPath,
		redirect,
		items,
		onupdate,
	}: SettingsProps = $props()

	let settingsId = id
	let appSettings = $state(DEFAULT_APP_SETTINGS)
	let settingsReveal = $state(DEFAULT_REVEAL_STATE)

	function handleClickOutsideSettings() {
		settingsReveal = {reveal: 'collapsed'}
	}

	function handleToggle(payload) {
		settingsReveal = {reveal: payload.state}
	}

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

	let brightness = $state(appSettings.brightness)
	let reveal = $derived(settingsReveal.reveal)
	let showBackground = background
		? `bg:${background}`
		: !color
			? 'bg:inherit'
			: ''
	let show = $derived(`${reveal} ${showBackground}`)
	let revealClasses = $derived(`form:${reveal} nowrap`)
	let formClasses = `l:flex nowrap ${showBackground}`
	let layoutClass = layout ? `l:${layout}:${size}` : 'l:side'
	let layoutClasses = `${layoutClass} l:reveal:auto bp:${breakpoint} ${size} align:${align}`

	let revealAction = $derived(
		formaction
			? redirect
				? `${formaction}&redirectTo=${redirect}`
				: formaction
			: 'toggleSettings',
	)
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

<div class={layoutClasses}>
	<form
		name="settings-reveal"
		{method}
		action={revealAction && actionPath
			? `${actionPath}?/${revealAction}`
			: `?/${revealAction}`}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
		class={revealClasses}
	>
		<Expand
			id={`button-reveal-${id}`}
			{variant}
			{color}
			{size}
			type={actionPath && formaction ? 'submit' : 'button'}
			name={`reveal-settings`}
			controls={id}
			text="settings"
			asset="settings"
			onclick={handleToggle}
			states={EXPAND_MACHINE}
		>
			Settings
		</Expand>
	</form>
	<div {id} class={`${show} l:flex align:center content`}>
		<form
			name="settings-update"
			{method}
			action={settingsUpdateAction && actionPath
				? `${actionPath}?/${settingsUpdateAction}`
				: `?/${settingsUpdateAction}`}
			use:enhance={() => {
				// prevent default callback from resetting the form
				return ({update}) => {
					update({reset: false})
				}
			}}
			class={`menu:settings ${formClasses}`}
		>
			{#each items.switch as { id, name, title, variant, shape, color, size, value, states }}
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
		<menu class="links:settings end">
			{#each items.links as { title, url, shape, size, asset }}
				<li class="l:frame:round">
					<a
						class={`${variant} shape:${shape} color:${color} ${asset} size:${size}`}
						href={url}
						target="_blank"
						rel="noreferrer"
						{title}
					>
					</a>
				</li>
			{/each}
		</menu>
	</div>
</div>
