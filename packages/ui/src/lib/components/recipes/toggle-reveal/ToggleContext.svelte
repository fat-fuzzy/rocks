<script lang="ts">
	import type {ToggleRevealProps, RevealContextProps} from '$types'

	import constants from '$lib/types/constants.js'
	import ToggleReveal from '$lib/components/recipes/toggle-reveal/ToggleReveal.svelte'
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
		context,
	}: ToggleRevealProps & RevealContextProps = $props()

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

<ToggleReveal
	{id}
	label="Settings"
	auto={true}
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
>
	<Settings
		id={`${id}-menu`}
		label=""
		items={preferences.display}
		{formaction}
		{actionPath}
		onupdate={preferences.onupdate}
	/>
</ToggleReveal>
