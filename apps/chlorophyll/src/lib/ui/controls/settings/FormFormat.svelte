<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {ActionCrud, IDocService} from '$types'

	import * as validators from '$lib/generated/ajv/validation/validate.ajv.mjs'

	import {getContext, onDestroy, onMount} from 'svelte'
	import {SvelteURL} from 'svelte/reactivity'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'

	const {Button, Input, Feedback} = ui.blocks
	const {FormValidator} = ui.utils

	interface Props {
		cta: ActionCrud
		format?: string
		color?: UiColor
	}
	let {cta, format = '', color = 'primary'}: Props = $props()

	let docService: IDocService = getContext('docService')

	const validator = new FormValidator(
		'FormFormatValidationFunction',
		validators,
	)

	const inputTypes: {[name: string]: string} = {
		name: 'text',
		sourceFormat: 'text',
	}
	let form: HTMLFormElement
	let formData: FormData | undefined = $state()

	let labelSubmit = $derived(
		cta === 'delete'
			? 'Delete'
			: cta === 'save'
				? 'Save'
				: cta === 'update'
					? 'Update'
					: cta === 'copy'
						? 'Copy'
						: 'Submit',
	)

	let errorFormatExists = $state(false)
	let newFormat = $derived(format)
	let sourceFormat: string | undefined = $state()
	let sourceFormatHint =
		'Use lower or uppercase letters, numbers, dashes or underscores'

	let disabled: boolean | undefined = $derived(
		validator.formHasErrors() || errorFormatExists,
	)

	function handleFocus(event: Event) {
		validator.touchInput(event)
	}

	function handleBlur(event: Event) {
		validator.validateInput(event)
	}

	function updateFormat(event: Event) {
		validator.changeInput(event)

		const target = event.target as HTMLInputElement

		newFormat = target.value

		const formatFound = checkFormatExists(newFormat)

		if (formatFound) {
			errorFormatExists = true
		} else {
			errorFormatExists = false
		}
	}

	function updateSourceFormat(event: Event) {
		validator.changeInput(event)

		const target = event.target as HTMLInputElement

		sourceFormat = target.value
	}

	function checkFormatExists(formatName: string): boolean {
		return docService.base.formats.includes(formatName)
	}

	function saveFormat() {
		if (validator.formHasErrors()) {
			return
		}

		docService.addFormat({
			name: newFormat,
			sourceFormat: sourceFormat ?? 'long',
		})

		dialogActor.close()

		let url = new SvelteURL(page.url)
		url.searchParams.delete('format')
		url.searchParams.append('format', newFormat)

		window.location.href = url.href
	}

	function deleteFormat() {
		// TODO
		// dialogActor.close()
		// if (page.url.searchParams.get('format') === newFormat) {
		// 	let url = new SvelteURL(page.url)
		// 	url.searchParams.delete('format')
		// 	window.location.href = url.href
		// }
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

<form
	class={`raviolink l:${cta === 'delete' ? 'stack' : 'sidebar'}`}
	bind:this={form}
>
	{#if cta === 'delete'}
		<label class="l:stack:xs font:sm variant:bare">
			Format
			<input
				id="name"
				type="text"
				name="name"
				{color}
				value={format}
				required
				readonly
			/>
		</label>
	{:else if cta === 'save' || cta === 'update' || cta === 'copy'}
		<div class="l:main l:stack">
			<Input
				id="name"
				label="New Format"
				type="text"
				name="name"
				{color}
				font="sm"
				variant="bare"
				size="xs"
				asset="none"
				value={newFormat}
				oninput={updateFormat}
				onchange={updateFormat}
				onblur={handleBlur}
				onfocus={handleFocus}
				required
				hint={sourceFormatHint}
				{validator}
			/>
			{#if errorFormatExists}
				<Feedback
					status="error"
					context="prose"
					variant="bare"
					size="sm"
					asset="none"
					surfaceLightness={0}
				>
					<p>
						Format <span class="font:semibold">{newFormat}</span> already exists
					</p>
				</Feedback>
			{/if}
		</div>
		<div class="l:side l:stack">
			{#if docService.base.formats.length}
				<label class="size:2xs font:sm">
					Source Format
					<select
						class="w:full size:2xs font:sm"
						name="sourceFormat"
						id="sourceFormat"
						onselect={updateSourceFormat}
						onblur={updateSourceFormat}
						onfocus={handleFocus}
					>
						<option class="size:xs font:xs" value={null}>
							No format selected
						</option>
						{#each docService.base.formats as lang, i (i)}
							<option class="size:xs font:xs" value={lang}>
								{lang}
							</option>
						{/each}
					</select>
				</label>
				<Feedback
					context="prose"
					variant="bare"
					size="sm"
					asset="none"
					surface="primary"
					surfaceLightness={0}
				>
					<p class="font:sm font:heading">Optional</p>
					<ul>
						<li>Select the format from which to source the initial content</li>
						<li>
							If no format is selected, document sections and blocks in the new
							format will contain a placeholder in English
						</li>
					</ul>
				</Feedback>
			{/if}
		</div>
	{/if}
	<div class="l:flex w:full justify:end">
		<div class="l:flex">
			<Button
				label="Cancel"
				id="language-dialog-reset"
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
				id="language-dialog-submit"
				name=""
				{color}
				variant="fill"
				shape="mellow"
				size="2xs"
				{disabled}
				onclick={cta === 'delete' ? deleteFormat : saveFormat}
			/>
		</div>
	</div>
</form>
