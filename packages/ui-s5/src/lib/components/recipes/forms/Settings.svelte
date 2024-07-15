<script lang="ts">
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants.js'
	import type {SettingsProps} from './settings.types.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/expand.types.js'
	import Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'
	import {SWITCH_MACHINE} from '$lib/components/blocks/buttons/Switch/switch.types.js'

	const {SVG_ASSETS, DEFAULT_APP_SETTINGS, DEFAULT_REVEAL_STATE} = constants

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

	function handleToggle(event) {
		settingsReveal = {reveal: event.state}
	}

	function handleUpdate(event) {
		switch (event.id) {
			case 'brightness':
				appSettings.brightness = event.value
				break
			case 'contrast':
				appSettings.contrast = event.value
				break
			default:
				break
		}
		if (onupdate) onupdate(event)
	}

	let reveal = $derived(settingsReveal.reveal)
	let brightness = $derived(appSettings.brightness)
	let showBackground = background
		? `bg:${background}`
		: !color
			? 'bg:inherit'
			: ''
	let show = $derived(`${reveal} ${showBackground}`)
	let revealClasses = $derived(`form:${reveal} nowrap`)
	let formClasses = `l:switcher:xs ${showBackground}`
	let layoutClass = layout ? `l:${layout}:${size}` : 'l:side'
	let layoutClasses = `${layoutClass} l:reveal:auto bp:${breakpoint} ${size} align:${align}`

	let revealAction = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: 'toggleNav'
	let settingsUpdateAction = redirect
		? `updateSettings&redirectTo=${redirect}`
		: 'updateSettings'
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
			id={`button-expand-${id}`}
			{variant}
			{color}
			{size}
			type={actionPath && formaction ? 'submit' : 'button'}
			title="Settings"
			name={`button-${id}`}
			controls={id}
			value={settingsReveal[id]}
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
			{#each items.switch as { id, name, title, variant, shape, color, size, states }}
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
						value={id}
						{title}
						{variant}
						{shape}
						{color}
						{size}
						states={switchStates}
						onclick={handleUpdate}
					/>
				</div>
			{/each}
		</form>
		<menu class="links:settings end">
			{#each items.links as { id, title, url, shape, size, asset }}
				{@const assetValue = SVG_ASSETS[brightness]
					? SVG_ASSETS[brightness][id]
					: ''}
				<li class="l:frame:round">
					<a
						class={`${variant} font:${size} shape:${shape} ${color}`}
						href={url}
						target="_blank"
						rel="noreferrer"
					>
						<!---TODO: Manage svg assets as SVGs -->
						<img src={assetValue} alt={title} class={`${id} ${asset}`} />
					</a>
				</li>
			{/each}
		</menu>
	</div>
</div>
