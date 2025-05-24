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
		size = 'sm',
		font = 'sm',
		variant = 'outline',
		asset = 'settings',
		align = 'end',
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
	{variant}
	{asset}
	{align}
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
	<ul class="links:settings end unstyled">
		{#each preferences.links as { title, url, shape, size, asset }}
			<li>
				<a
					class={`${variant} shape:${shape} color:${color} ${asset} size:${size}`}
					href={url}
					{title}
					aria-label={title}
				>
				</a>
			</li>
		{/each}
	</ul>
</Reveal>
