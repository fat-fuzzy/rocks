<script lang="ts">
	import type {ActionCrud, Preset, ICoordinatePresets} from '$types'
	import type {UiColor} from '@fat-fuzzy/ui'

	import {onDestroy, onMount} from 'svelte'
	import {SvelteURL} from 'svelte/reactivity'
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	import {FormPresetValidator} from '$lib/common/validate'
	import {getSanitizedParamValue} from '$lib/common/url'
	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'

	const {Button, Input, Feedback} = ui.blocks
	const {FormValidator} = ui.utils

	interface Props {
		cta: ActionCrud
		preset: Preset
		color?: UiColor
		coordPresets: ICoordinatePresets
	}
	let {coordPresets, cta, preset, color = 'neutral'}: Props = $props()

	const validator = new FormValidator(FormPresetValidator)

	const inputTypes: {[name: string]: string} = {
		name: 'text',
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

	let presetExistsError = $state(false)
	let toUpdate: {[name: string]: string} = $derived({
		name: cta === 'copy' ? `${preset.name}-copy` : preset.name,
	})

	let disabled: boolean | undefined = $derived(
		validator.formHasErrors() || presetExistsError,
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

	function updateName(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement

		toUpdate.name = target.value

		const presetFound = coordPresets.getPreset(toUpdate.name)

		if (presetFound) {
			presetExistsError = true
		} else {
			presetExistsError = false
		}
	}

	function savePreset() {
		if (validator.formHasErrors()) {
			return
		}

		const presetName = String(toUpdate.name)

		let url = new SvelteURL(page.url)
		url.searchParams.delete('preset')
		url.searchParams.append('preset', presetName)

		coordPresets.savePreset({
			path: {
				filename: presetName,
				filetype: 'json',
			},
			meta: {
				content_type: 'preset',
				id: preset.id,
				name: presetName,
				label: presetName,
			},
			preset: {
				...preset,
				query: url.search,
				name: presetName,
			},
		})

		dialogActor.close()

		window.location.href = url.href
	}

	function deletePreset() {
		const presetName = String(toUpdate.name)

		coordPresets.deletePreset({
			path: {
				filename: presetName,
				filetype: 'json',
			},
			meta: {
				content_type: 'preset',
				id: preset.id,
				name: presetName,
				label: presetName,
			},
		})

		dialogActor.close()

		const currentPreset = getSanitizedParamValue(
			page.url.searchParams,
			'preset',
		)
		if (currentPreset === presetName) {
			let url = new SvelteURL(page.url)
			url.searchParams.delete('preset')

			window.location.href = url.href
		}
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

<form class="raviolink l:stack:lg" bind:this={form}>
	{#if cta === 'delete'}
		<label class="l:stack:xs font:sm variant:bare">
			Preset
			<input
				id="name"
				type="text"
				name="name"
				{color}
				value={toUpdate.name}
				required
				readonly
			/>
		</label>
	{:else if cta === 'save' || cta === 'update' || cta === 'copy'}
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
			value={toUpdate.name}
			oninput={updateName}
			onchange={updateName}
			onblur={handleBlur}
			onfocus={handleFocus}
			required
			hint="Use lower or uppercase letters, numbers, dashes or underscores"
			{validator}
		/>
	{/if}
	{#if presetExistsError}
		<Feedback
			status="error"
			context="prose"
			variant="bare"
			asset="default"
			size="2xs"
		>
			<p class="font:sm">
				A block named <span class="font:semibold font:xs">{toUpdate.name}</span> already
				exists
			</p>
		</Feedback>
	{/if}
	<div class="l:flex w:full justify:center l:switcher th:xs hug">
		<Button
			label="Cancel"
			id="preset-dialog-reset"
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
			id="preset-dialog-submit"
			name=""
			{color}
			variant="fill"
			shape="mellow"
			size="2xs"
			{disabled}
			onclick={cta === 'delete' ? deletePreset : savePreset}
		/>
	</div>
</form>
