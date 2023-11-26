<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import Expand from '$lib/components/blocks/buttons/Expand.svelte'
	import Switch from '$lib/components/blocks/buttons/Switch.svelte'
	import * as settings from '$lib/stores/settings'

	const method = 'POST'
	export let breakpoint = 'xs'
	export let background: string | undefined = undefined
	export let id = 'menu-settings-settings'
	export let size = ''
	export let color = ''
	export let variant = 'outline'
	export let layout = 'side'
	export let align = 'end'
	export let path: string | undefined = undefined

	export let items = {
		switch: [
			{
				id: 'brightness',
				name: 'brightness',
				title: 'Brightness',
				variant: 'outline',
				shape: 'round',
				color: 'primary',
				size: 'md',
				states: {
					active: {text: 'night', value: 'night', asset: 'emoji:night'},
					inactive: {text: 'day', value: 'day', asset: 'emoji:day'},
				},
			},
			{
				id: 'contrast',
				name: 'contrast',
				title: 'Contrast',
				variant: 'outline',
				shape: 'round',
				color: 'primary',
				size: 'md',
				states: {
					active: {text: 'contrast', value: 'contrast', asset: 'emoji:contrast'},
					inactive: {text: 'blend', value: 'blend', asset: 'emoji:blend'},
				},
			},
		],
	}

	let appSettings: {[key: string]: string} = {brightness: '', contrast: ''}
	let settingsReveal: {[key: string]: string} = {reveal: ''}

	const stores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
		settings.reveal.subscribe((value) => {
			if (value) {
				settingsReveal = value
			}
		}),
	]

	function handleClickOutsideSettings() {
		settings.reveal.set({reveal: 'minimize'})
	}

	function handleToggle(event: CustomEvent) {
		const updated = event.detail.expanded ? 'show' : 'minimize'
		settings.reveal.set({reveal: updated})
	}

	function handleUpdate(event: CustomEvent) {
		let updated
		switch (event.detail.id) {
			case 'contrast':
				updated = event.detail.pressed ? 'contrast' : 'blend'
				settings.app.set({brightness: appSettings.brightness, contrast: updated})
				break
			case 'brightness':
				updated = event.detail.pressed ? 'night' : 'day'
				settings.app.set({brightness: updated, contrast: appSettings.contrast})
				break
			default:
				break
		}
	}

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})

	$: reveal = settingsReveal.reveal
	$: showBackground = background ? `bg:${background}` : 'bg:inherit'
	$: show = `show ${showBackground}`
	$: showSettings = reveal === 'show' ? show : 'hide:viz-only'
	$: revealClasses = `form:expand card:lg`
	$: menuClasses = `l:switcher:lg ${showBackground}`
	$: layoutClasses = `l:${layout} l:reveal:auto bp:${breakpoint} align:${align}`
</script>

<div class={layoutClasses}>
	<form
		name="settings-reveal"
		{method}
		action={`/?/toggleSettings&redirectTo=${path}`}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
		class={revealClasses}
	>
		<Expand
			id={`${id}-settings-settings-button`}
			{variant}
			{color}
			{size}
			title="Settings"
			name="reveal"
			controls={`reveal-${id}`}
			value={settingsReveal[id]}
			states={{
				active: {text: 'settings', value: 'show', asset: 'emoji:settings'},
				inactive: {text: 'settings', value: 'minimize', asset: 'emoji:settings'},
			}}
			on:click={handleToggle}
		>
			Settings
		</Expand>
	</form>
	<div id={`reveal-${id}`} class={showSettings}>
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
			use:clickOutside
			on:clickOutside={handleClickOutsideSettings}
			class={menuClasses}
		>
			{#each items.switch as { id, name, title, variant, shape, color, size, states }}
				<Switch
					{id}
					{name}
					{title}
					{variant}
					{shape}
					{color}
					{size}
					value={appSettings[id]}
					{states}
					on:click={handleUpdate}
				/>
			{/each}
		</form>
	</div>
</div>
