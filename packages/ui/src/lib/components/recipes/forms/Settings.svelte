<script lang="ts">
	import type {SettingsProps} from '$types'
	import {enhance} from '$app/forms'
	import Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'

	let {
		id = 'ui-settings',
		name = 'settings',
		background,
		color = 'primary',
		formaction,
		actionPath,
		redirect,
		items,
		onupdate,
	}: SettingsProps = $props()

	let settingsId = id
	let action = $derived(
		redirect ? `${formaction}&redirectTo=${redirect}` : formaction,
	)

	let showBackground = background
		? `bg:${background}`
		: !color
			? 'bg:inherit'
			: ''
	let formClasses = `l:flex size:3xs nowrap ${showBackground}`
</script>

<form
	{name}
	method="POST"
	action={action
		? actionPath
			? `${actionPath}?/${action}`
			: `?/${action}`
		: undefined}
	use:enhance
	class={`menu:${name} ${formClasses}`}
	onsubmit={(e) => onupdate}
>
	{#each items as { id, name, title, initial, variant, shape, color, size, value, states }}
		<Switch
			id={`${settingsId}-${id}`}
			{name}
			{title}
			{variant}
			{shape}
			{color}
			{size}
			{value}
			{initial}
			{states}
		/>
	{/each}
</form>
