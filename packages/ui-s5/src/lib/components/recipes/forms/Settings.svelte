<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'

	import * as settings from '$stores/settings.js'
	import constants from '$lib/types/constants.js'
	import type {SettingsProps} from './settings.types.js'

	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'

	const {SVG_ASSETS, DEFAULT_APP_SETTINGS, DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'settings',
		method = 'POST',
		breakpoint = 'xs',
		background,
		layout,
		path,
		color = 'primary',
		size = 'sm',
		variant = 'outline',
		align = 'end',
		formaction,
		actionPath,
		redirect,
		items,
		children,
	}: SettingsProps = $props()

	let settingsId = id
	let appSettings = $state(DEFAULT_APP_SETTINGS)
	let settingsReveal = $state(DEFAULT_REVEAL_STATE)

	const stores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
		settings.settingsReveal.subscribe((value) => {
			if (value) {
				settingsReveal = value
			}
		}),
	]

	function handleClickOutsideSettings() {
		settings.settingsReveal.set({reveal: 'minimize'})
	}

	function handleToggle(event) {
		const updated = event.expanded ? 'show' : 'minimize'
		settings.settingsReveal.set({reveal: updated})
	}

	function handleUpdate(event) {
		let updated
		switch (event.id) {
			case 'contrast':
				updated = event.active ? 'contrast' : 'blend'
				settings.app.set({
					brightness: appSettings.brightness,
					contrast: updated,
				})
				break
			case 'brightness':
				updated = event.active ? 'night' : 'day'
				settings.app.set({brightness: updated, contrast: appSettings.contrast})
				break
			default:
				break
		}
	}

	let reveal = settingsReveal.reveal
	let brightness = appSettings.brightness
	let showBackground = background ? `bg:${background}` : 'bg:inherit'
	let show = `show ${showBackground}`
	let showSettings = reveal === 'show' ? show : 'hide:viz-only'
	let revealClasses = `form:expand card:md nowrap`
	let formClasses = `l:switcher:xs maki:block:2xs ${showBackground}`
	let layoutClass = layout ? `l:${layout}:${size}` : 'l:side'
	let layoutClasses = `${layoutClass} l:reveal:auto bp:${breakpoint} ${size} align:${align}`

	let action = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: 'toggleNav'

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<div class={layoutClasses}>
	<form
		name="settings-reveal"
		{method}
		action={action
			? actionPath
				? `${actionPath}?/${action}`
				: `/?/${action}`
			: undefined}
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
			states={{
				expanded: {
					id: 'settings-expanded',
					text: 'settings',
					value: 'show',
					asset: 'emoji:settings',
				},
				collapsed: {
					id: 'settings-collapsed',
					text: 'settings',
					value: 'minimize',
					asset: 'emoji:settings',
				},
			}}
			onclick={handleToggle}
		>
			Settings
		</Expand>
	</form>
	<div {id} class={`${showSettings} l:flex align:center`}>
		<form
			name="settings-update"
			{method}
			action={`/?/updateSettings&redirectTo=${path}`}
			use:enhance={() => {
				// prevent default callback from resetting the form
				return ({update}) => {
					update({reset: false})
				}
			}}
			class={`menu:settings ${formClasses}`}
		>
			{#each items.switch as { id, name, title, variant, shape, color, size, states }}
				<div class="l:frame:round maki:block:2xs">
					<Switch
						id={`${settingsId}-${id}`}
						{name}
						value={id}
						{title}
						{variant}
						{shape}
						{color}
						{size}
						{states}
						onclick={handleUpdate}
					/>
				</div>
			{/each}
		</form>
		<menu class="menu:settings end">
			{#each items.links as { id, title, url, shape, size, asset }}
				{@const assetValue = SVG_ASSETS[brightness]
					? SVG_ASSETS[brightness][id]
					: ''}
				<li class="l:frame:round maki:block:2xs">
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
