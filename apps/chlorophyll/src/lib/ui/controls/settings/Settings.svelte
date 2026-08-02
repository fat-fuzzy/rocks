<script lang="ts">
	import type {UiColor, UiVariant} from '@fat-fuzzy/ui'
	import type {TagGroup, InputGroupMenus} from '$types'

	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {InputGroup} = ui.blocks

	const {
		color = 'primary',
		variant = 'bare',
		oninput,
	}: {
		color?: UiColor
		variant?: UiVariant
		oninput: (e: Event) => void
	} = $props()

	let base = $derived(page.data.base)
	let language = $derived.by(() => {
		const lang = page.url.searchParams.get('language')
		return lang ? [lang] : ['en']
	})

	let format = $derived.by(() => {
		const fmt = page.url.searchParams.get('format')
		return fmt ? [fmt] : ['long']
	})

	let settingsItems = $derived.by(() => {
		const menus = base.settings.reduce(
			(
				menus: InputGroupMenus,
				{title, name, items}: TagGroup,
			): InputGroupMenus => {
				const menuItems = items.map((i: string) => {
					let selected = checkSelected(name, i)
					return {
						id: i,
						name,
						value: i,
						checked: selected ? true : undefined,
						label: i,
						title: title ?? name,
						variant: 'bare',
						shape: 'pill',
					}
				})
				menus[name] = menuItems
				return menus
			},
			{},
		)

		return menus
	})

	function checkSelected(group: string, value: string) {
		const allValues = page.url.searchParams.getAll(group)
		return allValues.includes(value)
	}
</script>

<InputGroup
	id="language"
	name="language"
	legend="Language"
	value={language}
	size="2xs"
	{color}
	{variant}
	items={settingsItems['language']}
	{oninput}
/>
<InputGroup
	id="format"
	name="format"
	legend="Format"
	value={format}
	size="2xs"
	{color}
	{variant}
	items={settingsItems['format']}
	{oninput}
/>
