<script lang="ts">
	import type {SettingsMenuProps} from '$types'
	import SettingsMenu from '$lib/components/recipes/menus/SettingsMenu.svelte'

	let {
		id = 'header-settings',
		breakpoint = 'sm',
		path,
		actionPath,
		redirect,
		items,
	}: SettingsMenuProps = $props()
	let className = 'header-settings'

	let headerClass = $derived(`${className} sticky:top card:xs`)
</script>

<header class={headerClass}>
	<SettingsMenu
		id={`${id}-menu-settings`}
		name={`${id}-menu-settings`}
		label=""
		{path}
		{breakpoint}
		size="xs"
		{actionPath}
		{redirect}
		formaction="updateSettings"
		items={items.settings.switch}
		onupdate={items?.settings.onupdate}
	/>
</header>
