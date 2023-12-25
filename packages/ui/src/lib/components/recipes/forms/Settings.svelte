<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'

	import {clickOutside} from '$lib/utils/click-outside.js'
	import * as settings from '$stores/settings'
	import constants from '$lib/types/constants'

	import Expand from '$lib/components/blocks/buttons/Expand.svelte'
	import Switch from '$lib/components/blocks/buttons/Switch.svelte'

	const {SVG_ASSETS, DEFAULT_APP_SETTINGS, DEFAULT_REVEAL_STATE, APP_SETTINGS} = constants
	const method = 'POST'
	export let breakpoint = 'xs'
	export let background: string | undefined = undefined
	export let id = 'settings'
	export let size = 'md'
	export let color = ''
	export let variant = 'outline'
	export let layout: string | undefined = undefined
	export let align = 'end'
	export let path: string | undefined = undefined
	export let formaction: string | undefined = undefined
	export let actionPath: string | undefined = undefined
	export let redirect: string | undefined = undefined

	export let items = APP_SETTINGS

	let settingsId = id
	let appSettings = DEFAULT_APP_SETTINGS
	let settingsReveal = DEFAULT_REVEAL_STATE

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

	function handleToggle(event: CustomEvent) {
		const updated = event.detail.expanded ? 'show' : 'minimize'
		settings.settingsReveal.set({reveal: updated})
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

	$: reveal = settingsReveal.reveal
	$: brightness = appSettings.brightness
	$: showBackground = background ? `bg:${background}` : 'bg:inherit'
	$: show = `show ${showBackground}`
	$: showSettings = reveal === 'show' ? show : 'hide:viz-only'
	$: revealClasses = `form:expand card:md nowrap`
	$: formClasses = `l:switcher:lg card:md ${showBackground}`
	$: layoutClass = layout ? `l:${layout}:${size}` : 'l:side'
	$: layoutClasses = `${layoutClass} l:reveal:auto bp:${breakpoint} ${size} align:${align}`

	$: action = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: 'toggleNav'

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<div class={layoutClasses} use:clickOutside on:clickOutside={handleClickOutsideSettings}>
	<form
		name="settings-reveal"
		{method}
		action={action ? (actionPath ? `${actionPath}?/${action}` : `/?/${action}`) : undefined}
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
				active: {text: 'settings', value: 'show', asset: 'emoji:settings'},
				inactive: {text: 'settings', value: 'minimize', asset: 'emoji:settings'},
			}}
			on:click={handleToggle}
		>
			Settings
		</Expand>
	</form>
	<div {id} class={`${showSettings} l:flex`}>
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
				<Switch
					id={`${settingsId}-${id}`}
					{name}
					{title}
					{variant}
					{shape}
					{color}
					{size}
					{states}
					on:click={handleUpdate}
				/>
			{/each}
		</form>
		<menu class="end">
			{#each items.links as { id, title, url, shape, size, asset }}
				{@const assetValue = SVG_ASSETS[brightness] ? SVG_ASSETS[brightness][id] : ''}
				<li>
					<a
						class={`${variant} font:${size} ${shape} ${color}`}
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
