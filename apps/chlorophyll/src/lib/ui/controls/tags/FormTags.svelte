<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {
		ActionCrud,
		InputCheckedTypes,
		Slug,
		TagGroup,
		TagProps,
		ITagService,
	} from '$types'

	import * as validators from '$lib/generated/ajv/validation/validate.ajv.mjs'

	import {getContext, onDestroy, onMount} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {
		checkSelectAll,
		parseGroupFromTargetData,
		applyTags,
	} from '$lib/common/tags'
	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import SelectTags from '$lib/ui/controls/tags/SelectTags.svelte'

	const {Button, Input, InputCheck, Feedback} = ui.blocks
	const {FormValidator} = ui.utils

	interface Props {
		groups: TagGroup[]
		cta: ActionCrud
		color?: UiColor
	}
	let {groups, cta, color = 'primary'}: Props = $props()

	let tagService: ITagService = getContext('tagService')

	const validator = new FormValidator('FormTagValidationFunction', validators)

	const inputTypes: {[name: string]: string} = {
		name: 'text',
		group: 'text',
		groups: 'text',
		groupTitle: 'text',
		type: 'text',
	}

	let tag: TagProps = $derived({
		name: '',
	})
	let tagsToDelete: {
		[group: string]: string[]
	} = $state({})

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

	let errorTagExists = $state(false)
	let errorGroupHasNoItems: string | undefined = $state(undefined)

	// FIXME: figure out why [required] is not working (validation)
	let disabled: boolean | undefined = $derived(
		validator.formHasErrors() ||
			errorTagExists ||
			(cta !== 'delete' && !tag.group)
			? true
			: undefined,
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

		tag.name = target.value

		if (tag.group) {
			const tagFound = checkTagExists(tag.group, tag.name)

			if (tagFound) {
				errorTagExists = true
			} else {
				errorTagExists = false
			}
		}
	}

	function updateGroup(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement

		tag.group = target.value

		if (tag.group) {
			const tagFound = checkTagExists(tag.group, tag.name)

			if (tagFound) {
				errorTagExists = true
			} else {
				errorTagExists = false
			}
		}
	}

	function updateGroupName(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement

		tag.groupTitle = target.value
	}

	function updateType(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement

		tag.type = target.value
	}

	function checkTagExists(group: string, tagName: string): Slug | undefined {
		const groupFound = groups.find((g) => g.name === group)

		if (groupFound) {
			return groupFound.items.find((t) => t === tagName)
		}
	}

	function saveTag() {
		if (validator.formHasErrors()) {
			return
		}

		const filename = String(tag.name)
		const group = tag.group
			? {
					name: String(tag.group),
					title: tag.groupTitle || tag.group,
					type: tag.type,
				}
			: {name: 'default', title: 'Default', type: tag.type}
		const newTag = {
			name: filename,
			group,
		}

		tagService.createTag(newTag)

		dialogActor.close()
	}

	function updateTags(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement
		const value = String(target.value)

		// The actual tag name to update
		if (!value) {
			return
		}

		const type = String(target.type) as InputCheckedTypes

		const isSelectAll = checkSelectAll('delete', type, value)
		const groupName = parseGroupFromTargetData(
			cta,
			isSelectAll ? value : String(target.name) || value,
			type,
			isSelectAll,
			'delete-tags',
		)

		const updatedTags = applyTags({
			cta,
			value,
			name: String(target.name),
			type,
			id: 'delete-tags',
			currentTags: tagsToDelete[groupName] ?? [],
			tagGroups: tagService.tags,
		})

		tagsToDelete[groupName] = updatedTags
	}

	function deleteTags() {
		const groups: {name: string; items: string[]}[] = Object.entries(
			tagsToDelete,
		).reduce((groups: {name: string; items: string[]}[], entry) => {
			groups.push({name: entry[0], items: [...entry[1]]})

			return groups
		}, [])

		tagService.deleteTags({groups})

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
		<SelectTags
			{cta}
			id="delete-tags"
			layout="switcher"
			size="sm"
			{color}
			value={[]}
			oninput={updateTags}
			tagGroups={tagService.tags}
		/>
		<Feedback
			status="default"
			context="prose"
			variant="bare"
			size="xs"
			font="sm"
			asset="none"
		>
			<p>
				The group <span class="font:semibold font:sm"> Twilight Z </span> cannot be
				deleted.
			</p>
			<p>Deleted tags will be removed without deleting content.</p>
		</Feedback>
	{:else if cta === 'save' || cta === 'update' || cta === 'copy'}
		<div class="l:sidebar size:md">
			<div class="l:main l:stack maki:tag:sm">
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
						value={tag.name}
						onchange={updateName}
						oninput={updateName}
						onblur={handleBlur}
						onfocus={handleFocus}
						layout="flex"
						hint="Use lower or uppercase letters, numbers, dashes or underscores"
						{validator}
					/>
				</div>
				<div class="l:flex align:start">
					{#if groups.length}
						<label class={`size:2xs font:sm color:${color}`}>
							Tag Group
							<select
								class="w:full size:2xs font:sm"
								name="groups"
								id="groups"
								{color}
								onchange={updateGroup}
								onselect={updateGroup}
								onblur={handleBlur}
								onfocus={handleFocus}
							>
								<option class="size:xs font:xs" value="">
									No group selected
								</option>
								{#each groups as group, i (i)}
									<option class="size:xs font:xs" value={group.name}>
										{group.title}
									</option>
								{/each}
							</select>
						</label>
					{/if}
					<fieldset class="variant:bare color:primary ravioli:md">
						<legend><span class="font:sm">New Tag Group</span></legend>
						<div class="l:stack">
							<Input
								id="group"
								label="Group Slug"
								type="text"
								name="group"
								{color}
								font="sm"
								variant="bare"
								size="xs"
								asset="none"
								onchange={updateGroup}
								oninput={updateGroup}
								onblur={handleBlur}
								onfocus={handleFocus}
								{validator}
							/>
							<Input
								id="groupTitle"
								label="Group Title"
								type="text"
								name="groupTitle"
								{color}
								font="sm"
								variant="bare"
								size="xs"
								asset="none"
								value=""
								onchange={updateGroupName}
								oninput={updateGroupName}
								onblur={handleBlur}
								onfocus={handleFocus}
								{validator}
							/>
							<div class="l:flex justify:between align:center">
								<InputCheck
									id="type"
									label="Radio group"
									name="type"
									{color}
									font="sm"
									variant="bare"
									size="xs"
									asset="none"
									value="radio"
									onchange={updateType}
									oninput={updateType}
									onblur={handleBlur}
									onfocus={handleFocus}
									hint="Select to enforce a unique tag choice"
									{validator}
								/>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
		</div>
	{/if}
	<div class={`l:flex justify:${errorTagExists ? 'between' : 'end'}`}>
		{#if errorTagExists}
			<Feedback
				status="error"
				context="prose"
				variant="bare"
				asset="default"
				size="2xs"
			>
				<p class="font:sm">
					A tag named <span class="font:semibold font:xs">{tag.name}</span>
					already exists in group
					<span class="font:semibold font:xs">{tag.group}</span>
				</p>
			</Feedback>
		{/if}
		{#if errorGroupHasNoItems}
			<Feedback
				status="error"
				context="prose"
				variant="bare"
				asset="default"
				size="2xs"
			>
				<p class="font:sm">
					No items can be found in group <span class="font:semibold font:xs">
						{errorGroupHasNoItems}
					</span>
				</p>
			</Feedback>
		{/if}
		<div class="l:flex">
			<Button
				label="Cancel"
				id="tag-dialog-reset"
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
				id="tag-dialog-submit"
				name=""
				{color}
				variant="fill"
				shape="mellow"
				size="2xs"
				{disabled}
				onclick={cta === 'delete' ? deleteTags : saveTag}
			/>
		</div>
	</div>
</form>
