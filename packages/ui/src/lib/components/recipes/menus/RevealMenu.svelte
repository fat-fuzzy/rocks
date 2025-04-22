<script lang="ts">
	import type {RevealMenuProps} from '$types'

	import styleHelper from '$lib/utils/styles.js'
	import Reveal from '$lib/components/layouts/reveal/Reveal.svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	const VARIANT_MATCH: {[key: string]: string} = {
		outline: 'bare',
		bare: 'bare',
		fill: 'outline',
	}

	let {
		id = 'reveal-menu',
		title = 'RevealMenu',
		reveal = 'collapsed',
		formaction,
		actionPath,
		redirect,
		layout,
		container = 'ravioli',
		color,
		size,
		threshold,
		justify = 'start',
		variant = '',
		align = 'start',
		background,
		place = 'left',
		position,
		disabled,
		items = [],
		onclick,
	}: RevealMenuProps = $props()

	let innerVariant = $derived(VARIANT_MATCH[variant])
	let show = $derived(reveal ? `expanded ${place}` : `collapsed ${place}`)
	let menuClasses = $derived(
		styleHelper.getStyles({
			color,
			size,
			align,
			layout,
			threshold,
			container,
			background,
		}),
	)
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
	{justify}
>
	<menu id={`menu-${id}`} class={`${menuClasses} ${show}`}>
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
