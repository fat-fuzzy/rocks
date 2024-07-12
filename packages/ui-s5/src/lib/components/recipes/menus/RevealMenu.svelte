<script lang="ts">
	import type {RevealMenuProps} from './menu.types.js'

	import Reveal from '$lib/components/layouts/Reveal.svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	const VARIANT_MATCH: {[key: string]: string} = {
		outline: 'bare',
		bare: 'bare',
		default: 'outline',
	}

	let {
		id = 'reveal-menu',
		title = 'RevealMenu',
		reveal = 'collapsed',
		formaction,
		actionPath,
		redirect,
		layout = 'stack',
		container = 'card',
		color,
		size,
		threshold,
		variant = '',
		align = 'start',
		background,
		place = 'left',
		position,
		disabled,
		items = [],
		onclick,
	}: RevealMenuProps = $props()

	let innerVariant = VARIANT_MATCH[variant]
	let show = reveal ? `expanded ${place}` : `collapsed ${place}`
</script>

<Reveal
	{id}
	{variant}
	{title}
	{size}
	{color}
	{reveal}
	{actionPath}
	{formaction}
	{redirect}
	{position}
	{place}
>
	<menu
		id={`menu-${id}`}
		class={`content l:${layout}:${size} ${container}:${size} th:${threshold} layer bg:${background} card:${size} align:${align} ${size} ${show}`}
	>
		{#each items as buttonProps}
			<li>
				<Button
					{onclick}
					variant={innerVariant}
					{color}
					{disabled}
					{...buttonProps}
				/>
			</li>
		{/each}
	</menu>
</Reveal>
