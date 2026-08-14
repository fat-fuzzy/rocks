<script lang="ts">
	import type {UiColor, UiShape, UiVariant, InputProps} from '@fat-fuzzy/ui'
	import type {IDocService} from '$types'

	import {getContext} from 'svelte'
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

	let docService: IDocService = getContext('docService')

	let base = $derived(docService.base)

	let language = $derived.by(() => {
		const lang = page.url.searchParams.get('language')
		return lang ? [lang] : ['en']
	})

	let format = $derived.by(() => {
		const fmt = page.url.searchParams.get('format')
		return fmt ? [fmt] : ['long']
	})

	// @ts-expect-error FIXME: add validator
	let languageItems: InputProps[] = $derived(
		base.languages.map((i: string) => {
			let selected = checkSelected('language', i)
			return {
				id: i,
				name: i,
				value: i,
				checked: selected ? true : undefined,
				label: i,
				title: i,
				variant: 'bare' as UiVariant,
				shape: 'pill' as UiShape,
			}
		}),
	)

	// @ts-expect-error FIXME: add validator
	let formatItems: InputProps[] = $derived(
		base.formats.map((i: string) => {
			let selected = checkSelected('format', i)
			return {
				id: i,
				name: i,
				value: i,
				checked: selected ? true : undefined,
				label: i,
				title: i,
				variant: 'bare' as UiVariant,
				shape: 'pill' as UiShape,
			}
		}),
	)

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
	items={languageItems}
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
	items={formatItems}
	{oninput}
/>
