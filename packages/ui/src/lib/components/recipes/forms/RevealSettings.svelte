<script lang="ts">
	import type {RevealSettingsProps} from '$types'
	import constants from '$lib/types/constants.js'
	import Reveal from '$lib/components/layouts/Reveal/Reveal.svelte'
	import Settings from '$lib/components/recipes/forms/Settings.svelte'

	const {DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'ui-reveal-settings',
		breakpoint = 'xs',
		background,
		layout,
		color = 'primary',
		size = 'sm',
		variant = 'outline',
		asset = 'settings',
		align = 'end',
		formaction,
		actionPath,
		redirect,
		items,
		onupdate,
	}: RevealSettingsProps = $props()

	let settingsReveal = $state(DEFAULT_REVEAL_STATE)
	let reveal = $derived(settingsReveal.reveal)
</script>

<Reveal
	{id}
	title="Settings"
	name={id}
	auto={true}
	{reveal}
	{breakpoint}
	{background}
	{layout}
	{size}
	{color}
	{variant}
	{asset}
	{align}
	formaction="toggleSettings"
>
	<Settings
		id={`${id}-menu`}
		items={items.switch}
		{formaction}
		{actionPath}
		{redirect}
		{onupdate}
	/>
	<ul class="links:settings end unstyled">
		{#each items.links as { title, url, shape, size, asset }}
			<li>
				<a
					class={`${variant} shape:${shape} color:${color} ${asset} size:${size}`}
					href={url}
					target="_blank"
					rel="noreferrer"
					{title}
					aria-label={title}
				>
				</a>
			</li>
		{/each}
	</ul>
</Reveal>
