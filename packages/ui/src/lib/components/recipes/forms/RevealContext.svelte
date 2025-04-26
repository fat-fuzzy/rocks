<script lang="ts">
	import type {RevealContextProps} from '$types'
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
		items,
		reveal,
		onupdate,
	}: RevealContextProps = $props()
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
		items={items.display}
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
