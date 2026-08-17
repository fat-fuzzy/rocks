<script lang="ts">
	import type {UiColor, UiVariant, InputProps} from '@fat-fuzzy/ui'
	import type {IDocService} from '$types'

	import {getContext} from 'svelte'
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'
	import DialogSaveLanguage from '$lib/ui/controls/settings/DialogSaveLanguage.svelte'
	import DialogSaveFormat from '$lib/ui/controls/settings/DialogSaveFormat.svelte'

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
	let baseLanguages = $derived(docService.base.languages)
	let baseFormats = $derived(docService.base.formats)

	let currentLanguage = $derived.by(() => {
		const lang = page.url.searchParams.get('language')
		return lang ? [lang] : [DOC_LANGUAGE]
	})

	let currentFormat = $derived.by(() => {
		const fmt = page.url.searchParams.get('format')
		return fmt ? [fmt] : [DOC_FORMAT]
	})

	// @ts-expect-error FIXME: add validator
	let languageItems: InputProps[] = $derived(
		deriveInputs(baseLanguages, 'language'),
	)

	// @ts-expect-error FIXME: add validator
	let formatItems: InputProps[] = $derived(deriveInputs(baseFormats, 'format'))

	function deriveInputs(base: string[], type: string): Partial<InputProps>[] {
		return base.map((i: string) => {
			let selected = checkSelected(type, i)
			return {
				id: i,
				name: i,
				value: i,
				checked: selected ? true : undefined,
				label: i,
				title: i,
				variant: 'bare' as UiVariant,
			}
		})
	}

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
			id="dialog-add-language"
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
		justify="start"
		{color}
		{variant}
		items={formatItems}
		{oninput}
	/>
	{#if cta === 'edit' || cta === 'build'}
		<DialogSaveFormat
			id="dialog-add-format"
			label="Add Format"
			asset="plus"
			assetType="svg"
			cta="save"
		/>
	{/if}
</div>
