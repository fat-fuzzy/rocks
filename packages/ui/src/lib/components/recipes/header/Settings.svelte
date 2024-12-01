<script lang="ts">
	import type {SettingsProps} from '$types'
	import Reveal from '$lib/components/layouts/Reveal.svelte'
	import SettingsMenu from '$lib/components/recipes/menus/SettingsMenu.svelte'

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
</script>

<Reveal
	{id}
	title="Settings"
	name={id}
	auto={true}
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
	<menu class="links:settings end">
		{#each items.links as { title, url, shape, size, asset }}
			<li class="l:frame:round">
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
	</menu>
</Reveal>
