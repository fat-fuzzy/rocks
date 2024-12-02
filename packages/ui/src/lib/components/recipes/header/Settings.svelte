<script lang="ts">
	import type {SettingsProps} from '$types'
	import constants from '$lib/types/constants.js'
	import Reveal from '$lib/components/layouts/Reveal.svelte'
	import SettingsMenu from '$lib/components/recipes/menus/SettingsMenu.svelte'

	const {DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'settings',
		breakpoint = 'xs',
		background,
		layout,
		color = 'primary',
		size = 'sm',
		variant = 'outline',
		asset = 'settings',
		align = 'end',
		formaction,
		items,
		onupdate,
	}: SettingsProps = $props()

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
	<SettingsMenu
		id={`${id}-menu`}
		items={items.switch}
		{formaction}
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
