<script lang="ts">
	import type {UiColor, UiVariant, InputProps} from '@fat-fuzzy/ui'
	import type {IDocService} from '$types'

	import {getContext} from 'svelte'
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	import DialogSaveLanguage from '$lib/ui/controls/settings/DialogSaveLanguage.svelte'

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

	let cta = $derived(page.params.page)
	let base = $derived(docService.base)

	let currentLanguage = $derived.by(() => {
		const lang = page.url.searchParams.get('language')
		return lang ? [lang] : ['en']
	})

	let currentFormat = $derived.by(() => {
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
			}
		}),
	)

	function checkSelected(group: string, value: string) {
		const allValues = page.url.searchParams.getAll(group)
		return allValues.includes(value)
	}
</script>

<div class="l:stack">
	<InputGroup
		id="language"
		name="language"
		legend="Language"
		value={currentLanguage}
		size="2xs"
		{color}
		{variant}
		items={languageItems}
		{oninput}
	/>

	{#if cta === 'edit' || cta === 'build'}
		<DialogSaveLanguage
			id="cta-preset-add-new"
			label="Add Language"
			asset="plus"
			assetType="svg"
			cta="save"
		/>
	{/if}
</div>
<br />
<div class="l:stack">
	<InputGroup
		id="format"
		name="format"
		legend="Format"
		value={currentFormat}
		size="2xs"
		{color}
		{variant}
		items={formatItems}
		{oninput}
	/>
</div>
