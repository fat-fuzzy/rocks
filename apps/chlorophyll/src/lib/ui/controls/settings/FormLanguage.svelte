<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {ActionCrud, IDocService} from '$types'

	import * as validators from '$lib/generated/ajv/validation/validate.ajv.mjs'

	import {getContext, onDestroy, onMount} from 'svelte'
	import {SvelteURL} from 'svelte/reactivity'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import {DOC_LANGUAGE} from '$config/setup'

	const {Button, Input, Feedback} = ui.blocks
	const {FormValidator} = ui.utils

	interface Props {
		cta: ActionCrud
		language?: string
		color?: UiColor
	}
	let {cta, language = '', color = 'primary'}: Props = $props()

	let docService: IDocService = getContext('docService')

	const validator = new FormValidator(
		'FormLanguageValidationFunction',
		validators,
	)

	const inputTypes: {[name: string]: string} = {
		name: 'text',
		sourceLanguage: 'text',
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

	let errorLanguageExists = $state(false)
	let newLanguage = $derived(language)
	let sourceLanguage: string | undefined = $state()
	let sourceLanguageHint = `Use two lowercase letters. Example: "ja" for "Japanese"`

	let disabled: boolean | undefined = $derived(
		validator.formHasErrors() || errorLanguageExists,
	)

	function handleFocus(event: Event) {
		validator.touchInput(event)
	}

	function handleBlur(event: Event) {
		validator.validateInput(event)
	}

	function updateLanguage(event: Event) {
		validator.changeInput(event)

		const target = event.target as HTMLInputElement

		newLanguage = target.value

		const languageFound = checkLanguageExists(newLanguage)

		if (languageFound) {
			errorLanguageExists = true
		} else {
			errorLanguageExists = false
		}
	}

	function updateSourceLanguage(event: Event) {
		validator.changeInput(event)

		const target = event.target as HTMLInputElement

		sourceLanguage = target.value
	}

	function checkLanguageExists(languageName: string): boolean {
		return docService.base.languages.includes(languageName)
	}

	async function saveLanguage() {
		if (validator.formHasErrors()) {
			return
		}

		let fromLang = DOC_LANGUAGE
		if (sourceLanguage) {
			fromLang = sourceLanguage
		}

		await docService.addLanguage({
			name: newLanguage,
			sourceLanguage: fromLang,
		})

		dialogActor.close()

		let url = new SvelteURL(page.url)
		url.searchParams.delete('language')
		url.searchParams.append('language', newLanguage)

		window.location.href = url.href
	}

	function deleteLanguage() {
		// TODO
		// dialogActor.close()
		// if (page.url.searchParams.get('language') === newLanguage) {
		// 	let url = new SvelteURL(page.url)
		// 	url.searchParams.delete('language')
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
			Language
			<input
				id="name"
				type="text"
				name="name"
				{color}
				value={language}
				required
				readonly
			/>
		</label>
	{:else if cta === 'save' || cta === 'update' || cta === 'copy'}
		<div class="l:main l:stack">
			<Input
				id="name"
				label="New Language"
				type="text"
				name="name"
				{color}
				font="sm"
				variant="bare"
				size="xs"
				asset="none"
				value={newLanguage}
				oninput={updateLanguage}
				onchange={updateLanguage}
				onblur={handleBlur}
				onfocus={handleFocus}
				required
				hint={sourceLanguageHint}
				{validator}
			/>
			{#if errorLanguageExists}
				<Feedback
					status="error"
					context="prose"
					variant="bare"
					size="sm"
					asset="none"
					surfaceLightness={0}
				>
					<p>
						Language <span class="font:semibold">{newLanguage}</span> already exists
					</p>
				</Feedback>
			{/if}
		</div>
		<div class="l:side l:stack">
			{#if docService.base.languages.length}
				<label class="size:2xs font:sm">
					Source Language
					<select
						class="w:full size:2xs font:sm"
						name="sourceLanguage"
						id="sourceLanguage"
						onselect={updateSourceLanguage}
						onblur={updateSourceLanguage}
						onfocus={handleFocus}
					>
						<option class="size:xs font:xs" value={null}>
							No language selected
						</option>
						{#each docService.base.languages as lang, i (i)}
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
						<li>
							Select the language from which to source the initial content
						</li>
						<li>
							If no language is selected, document sections and blocks in the
							new language will contain a placeholder in English
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
				onclick={cta === 'delete' ? deleteLanguage : saveLanguage}
			/>
		</div>
	</div>
</form>
