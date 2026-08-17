<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {
		ActionCrud,
		Slug,
		DocLanguage,
		Section,
		IDocService,
	} from '$types'

	import * as validators from '$lib/generated/ajv/validation/validate.ajv.mjs'

	import {getContext, onDestroy, onMount} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import {DOC_LANGUAGE, DOC_FORMAT} from '$config/setup'

	const {Button, Input, InputGroup, Feedback} = ui.blocks
	const {FormValidator} = ui.utils

	interface Props {
		formats: Slug[]
		cta: ActionCrud
		color?: UiColor
	}
	let {formats, cta, color = 'primary'}: Props = $props()

	let docService: IDocService = getContext('docService')

	const validator = new FormValidator(
		'FormSectionValidationFunction',
		validators,
	)

	const inputTypes: {[name: string]: string} = {
		name: 'text',
		title: 'text',
		rank: 'number',
		formats: 'text', // TODO: check / validate select input
	}

	type SectionProps = {
		name: string
		title?: string
		rank?: number
		formats: Slug[]
	}

	let section: SectionProps = $state({
		name: '',
		rank: 1,
		formats: [],
	})

	let form: HTMLFormElement
	let formData: FormData | undefined = $state()

	let labelSubmit = $derived(
		cta === 'delete'
			? 'Delete'
			: cta === 'save'
				? 'Save Section'
				: cta === 'update'
					? 'Update'
					: cta === 'copy'
						? 'Copy'
						: 'Submit',
	)

	let sectionExistsError = $state(false)
	let disabled: boolean | undefined = $derived(
		validator.formHasErrors() || sectionExistsError ? true : undefined,
	)

	function handleFocus(event: Event) {
		validator.touchInput(event)
	}

	function handleBlur(event: Event) {
		validator.validateInput(event)
	}

	function handleChange(event: Event) {
		validator.changeInput(event)
	}

	function updateTitle(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement
		section.title = target.value
	}

	function updateRank(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement
		section.rank = Number(target.value)
	}

	function updateFormats(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement

		if (target?.value) {
			const format = String(target.value) as Slug
			if (!section.formats.includes(format)) {
				section.formats.push(format)
			} else {
				section.formats = section.formats.filter((t) => t !== format)
			}
		}
	}

	function updateName(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement

		section.name = target.value

		const sectionFound = checkSectionExists(section.name)

		if (sectionFound) {
			sectionExistsError = true
		} else {
			sectionExistsError = false
		}
	}

	function checkSectionExists(sectionName: string): Section | undefined {
		return docService.getSectionByName({
			language: DOC_LANGUAGE as DocLanguage,
			format: DOC_FORMAT as Slug,
			name: sectionName,
		})
	}

	function saveSection() {
		if (validator.formHasErrors()) {
			return
		}

		const title = section.title ? String(section.title).trim() : undefined
		const newSection = {
			name: String(section.name),
			title: title !== '' ? title : undefined,
			rank: section.rank ? Number(section.rank) : 1,
			formats,
		}

		docService.createSection(JSON.parse(JSON.stringify(newSection)))

		dialogActor.close()

		// TODO: put selected sections into context (fix reactivity)
		const newUrl = new URL(page.url)
		newUrl.searchParams.append('sections', newSection.name)

		window.location.href = newUrl.href
	}

	function deleteSection() {
		// TODO
		// docService.deleteSection({
		// 	path: {
		// 		filename: sectionName,
		// 		filetype: 'json',
		// 	},
		// 	meta: {
		// 		id: section.id,
		// 		name: sectionName,
		// 		label: sectionName,
		// 		content_type: 'section',
		// 	},
		// })
		dialogActor.close()
	}

	onMount(() => {
		if (form) {
			formData = new FormData(form)
			validator.init(formData, inputTypes)
		}
	})

	onDestroy(() => {
		validator.destroy()
	})
</script>

<form class="form:wide raviolink l:stack:lg" bind:this={form}>
	{#if cta === 'delete'}
		<label class="l:stack:xs font:sm variant:bare">
			Section
			<input
				id="name"
				type="text"
				name="name"
				{color}
				value={section.name}
				required
				readonly
			/>
		</label>
	{:else if cta === 'save' || cta === 'update' || cta === 'copy'}
		<div class="l:flex align:end">
			<Input
				id="name"
				label="Name"
				type="text"
				name="name"
				{color}
				font="sm"
				variant="bare"
				size="xs"
				asset="none"
				value={section.name}
				onchange={updateName}
				oninput={updateName}
				onblur={handleBlur}
				onfocus={handleFocus}
				hint="Use lower or uppercase letters, numbers, dashes or underscores"
				{validator}
			/>
		</div>
		<div class="l:flex align:end">
			<Input
				id="title"
				label="Title"
				type="text"
				name="title"
				{color}
				font="sm"
				variant="bare"
				size="xs"
				asset="none"
				hint="Optional"
				value={section.title}
				onchange={updateTitle}
				oninput={updateTitle}
				onblur={handleBlur}
				onfocus={handleFocus}
				{validator}
			/>
		</div>
		<div class="l:flex align:start justify:between">
			<Input
				id="rank"
				label="Rank"
				type="number"
				name="rank"
				{color}
				font="sm"
				variant="bare"
				size="xs"
				asset="none"
				value={section.rank}
				onchange={updateRank}
				oninput={updateRank}
				onblur={handleBlur}
				onfocus={handleFocus}
				{validator}
			/>

			<div class="l:flex:2xs justify:end">
				<InputGroup
					id="section-formats"
					name="formats"
					legend="Doc Formats"
					type="checkbox"
					value={formats}
					size="2xs"
					color="primary"
					variant="bare"
					font="xs"
					oninput={updateFormats}
					onfocus={handleFocus}
					hint="Select which formats can include this section"
					items={formats.map((i) => ({
						id: i,
						name: i,
						value: i,
						checked: true,
						label: i,
						title: i,
						validator,
					}))}
					{validator}
				/>
			</div>
		</div>
	{/if}
	<div class={`l:flex justify:${sectionExistsError ? 'between' : 'end'}`}>
		{#if sectionExistsError}
			<Feedback
				status="error"
				context="prose"
				variant="bare"
				asset="default"
				size="sm"
			>
				<p>
					A section named <span class="font:semibold font:sm">
						{section.name}
					</span> already exists
				</p>
			</Feedback>
		{/if}
		<div class="l:flex">
			<Button
				label="Cancel"
				id="section-dialog-reset"
				name=""
				type="reset"
				{color}
				variant="outline"
				shape="mellow"
				size="2xs"
				onclick={() => dialogActor.cancel()}
			/>
			<Button
				label={labelSubmit}
				type="button"
				id="section-dialog-submit"
				name=""
				{color}
				variant="fill"
				shape="mellow"
				size="2xs"
				{disabled}
				onclick={cta === 'delete' ? deleteSection : saveSection}
			/>
		</div>
	</div>
</form>
