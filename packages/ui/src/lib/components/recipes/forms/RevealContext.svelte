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
	formaction="toggleAppContext"
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
