<script lang="ts">
	import type {RevealContextProps} from '$types'

	import constants from '$lib/types/constants.js'
	import Reveal from '$lib/components/layouts/reveal/Reveal.svelte'
	import Settings from '$lib/components/recipes/forms/Settings.svelte'

	let {
		id = 'ui-reveal-settings',
		breakpoint = 'xs',
		background,
		layout,
		color = 'primary',
		shape,
		size = 'sm',
		font = 'sm',
		variant = 'outline',
		asset = 'settings',
		align = 'end',
		justify,
		text,
		formaction,
		actionPath,
		redirect,
		reveal,
		context,
	}: RevealContextProps = $props()

	let brightness = $derived(context.brightness)
	let contrast = $derived(context.contrast)
	let preferences = $derived.by(() => {
		let preferences = constants.APP_SETTINGS
		preferences.display[0].initial =
			brightness === 'night' ? 'active' : 'inactive'
		preferences.display[1].initial =
			contrast === 'blend' ? 'active' : 'inactive'
		return preferences
	})
</script>

<Reveal
	{id}
	name={id}
	label="Settings"
	auto={true}
	element="div.app-context"
	{reveal}
	{breakpoint}
	{background}
	{layout}
	{size}
	{font}
	{color}
	{shape}
	{variant}
	{asset}
	{align}
	{justify}
	{text}
	formaction="toggleAppContext"
>
	<Settings
		id={`${id}-menu`}
		items={preferences.display}
		{formaction}
		{actionPath}
		{redirect}
		onupdate={preferences.onupdate}
	/>
</Reveal>
