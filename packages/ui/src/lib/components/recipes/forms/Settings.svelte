<script lang="ts">
	import type {SettingsProps} from '$types'
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants.js'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import SettingsMenu from '$lib/components/recipes/menus/SettingsMenu.svelte'

	const {DEFAULT_REVEAL_STATE} = constants

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

	let settingsReveal = $state(DEFAULT_REVEAL_STATE)

	function handleClickOutsideSettings() {
		settingsReveal = {reveal: 'collapsed'}
	}

	function handleToggle(payload) {
		settingsReveal = {reveal: payload.state}
	}

	let reveal = $derived(settingsReveal.reveal)
	let showBackground = background
		? `bg:${background}`
		: !color
			? 'bg:inherit'
			: ''
	let show = $derived(`${reveal} ${showBackground}`)
	let revealClasses = $derived(`form:${reveal} nowrap`)
	let layoutClass = layout ? `l:${layout}:${size}` : 'l:side'
	let layoutClasses = `${layoutClass} l:reveal:auto bp:${breakpoint} ${size} align:${align}`

	let revealAction = $derived(
		formaction
			? redirect
				? `${formaction}&redirectTo=${redirect}`
				: formaction
			: 'toggleSettings',
	)
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
		<SettingsMenu
			items={items.switch}
			{formaction}
			{actionPath}
			{redirect}
			{onupdate}
		/>
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
