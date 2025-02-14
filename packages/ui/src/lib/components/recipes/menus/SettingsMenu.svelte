<script lang="ts">
	import type {SettingsMenuProps} from '$types'
	import {enhance} from '$app/forms'
	import Switch from '$lib/components/blocks/buttons/Switch/Switch.svelte'

	let {
		id = 'ui-settings-menu',
		name = 'settings-update',
		method = 'POST',
		background,
		color = 'primary',
		formaction,
		actionPath,
		redirect,
		items,
		onupdate,
	}: SettingsMenuProps = $props()

	let settingsId = id
	let action = $derived(
		redirect ? `${formaction}&redirectTo=${redirect}` : formaction,
	)

	let showBackground = background
		? `bg:${background}`
		: !color
			? 'bg:inherit'
			: ''
	let formClasses = `l:flex nowrap ${showBackground}`
</script>

<form
	{name}
	{method}
	action={action
		? actionPath
			? `${actionPath}?/${action}`
			: `?/${action}`
		: undefined}
	use:enhance
	class={`menu:settings ${formClasses}`}
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
