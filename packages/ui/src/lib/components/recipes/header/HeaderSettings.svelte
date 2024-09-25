<script lang="ts">
	import type {HeaderProps} from '$types'
	import Settings from '$lib/components/recipes/forms/Settings.svelte'

	let {
		id = 'header-settings',
		breakpoint = 'sm',
		path,
		actionPath,
		redirect,
		items,
	}: HeaderProps = $props()
	let className = 'header-settings'

	let headerClass = $derived(`${className} sticky:top`)
</script>

<header class={headerClass}>
	<Settings
		name={`${id}-primary-nav`}
		label=""
		{path}
		{breakpoint}
		size="xs"
		id={`${id}-menu-settings`}
		{actionPath}
		{redirect}
		items={items.settings}
		onupdate={items?.settings.onupdate}
	/>
</header>
