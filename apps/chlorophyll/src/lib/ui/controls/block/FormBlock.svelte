<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'
	import type {
		Block,
		Path,
		Subsection,
		BlockProps,
		Uuid,
		ActionCrud,
		InputCheckedTypes,
		IDocService,
		ITagService,
	} from '$types'

	import * as validators from '$lib/generated/ajv/validation/validate.ajv.mjs'

	import {getContext, onDestroy, onMount} from 'svelte'
	import ui from '@fat-fuzzy/ui'

	import {applyTags} from '$lib/common/tags'
	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import SelectTags from '$lib/ui/controls/tags/SelectTags.svelte'

	const {Button, Input, Feedback} = ui.blocks
	const {FormValidator} = ui.utils

	interface Props {
		block?: Block
		parent: Path
		subsections?: Subsection[]
		cta: ActionCrud
		color?: UiColor
	}
	let {block, parent, subsections, cta, color = 'primary'}: Props = $props()

	let docService: IDocService = getContext('docService')
	let tagService: ITagService = getContext('tagService')

	const validator = new FormValidator('FormBlockValidationFunction', validators)

	const inputTypes: {[name: string]: string} = {
		name: 'text',
		title: 'text',
		rank: 'number',
		subsections: 'text',
		group: 'text',
		parent: 'text',
	}

	let toUpdate: BlockProps = $derived({
		name: '',
		rank: 1,
		parent,
		tags: [],
	})

	let highestRank = $derived.by(() => {
		if (toUpdate.group && subsections) {
			const subsection = subsections.find((s) => s.name === toUpdate.group)

			if (subsection) {
				const blockFound = subsection.blocks.find(
					(b) => b.name === toUpdate.name,
				)
				return blockFound ? blockFound.rank : subsection.blocks.length + 1
			}
		}

		return 1
	})

	let form: HTMLFormElement
	let formData: FormData | undefined = $state()

	let labelSubmit = $derived(
		cta === 'delete'
			? 'Delete'
			: cta === 'save'
				? 'Save Block'
				: cta === 'update'
					? 'Update'
					: cta === 'copy'
						? 'Copy'
						: 'Submit',
	)

	let errorBlockExists = $state(false)
	let errorBlockNotFound = $state(false)
	let errorCascadingName = $state(false)
	let errorNameNotAllowed = $state(false)

	let disabled: boolean | undefined = $derived(
		validator.formHasErrors() ||
			errorBlockExists ||
			errorCascadingName ||
			errorBlockNotFound ||
			errorNameNotAllowed
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

		toUpdate.name = target.value

		if (toUpdate.name === parent) {
			errorNameNotAllowed = true
		} else {
			errorNameNotAllowed = false
		}

		if (toUpdate.group && subsections) {
			const blockFound = checkBlockExists(toUpdate.group, toUpdate.name)

			if (blockFound) {
				errorBlockExists = true
			} else {
				errorBlockExists = false
				const subsection = subsections.find((s) => s.name === toUpdate.group)
				highestRank = subsection ? subsection.blocks.length + 1 : 1
			}
		}
	}

	function updateTitle(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement
		toUpdate.title = target.value
	}

	function updateGroup(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement

		if (target.value) {
			const blockFound = checkBlockExists(target.value, toUpdate.name)

			if (blockFound) {
				errorBlockExists = true
			} else if (subsections) {
				errorBlockExists = false
				const subsection = subsections.find((s) => s.name === target.value)
				highestRank = subsection ? subsection.blocks.length + 1 : 1
			}
			if (target.value === parent && target.value === toUpdate.name) {
				errorCascadingName = true
			} else {
				errorCascadingName = false
			}
		}

		toUpdate.group = target.value
	}

	function updateRank(event: Event) {
		handleChange(event)

		const target = event.target as HTMLInputElement
		toUpdate.rank = Number(target.value)
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

		toUpdate.tags = applyTags({
			cta,
			value,
			name: String(target.name),
			type,
			id: 'tags',
			currentTags: toUpdate.tags,
			tagGroups: tagService.tags,
		})
	}

	function checkBlockExists(
		group: string,
		blockName: string,
	): Block | undefined {
		const subsection = subsections
			? subsections.find((s) => s.name === group)
			: undefined

		if (subsection) {
			return subsection.blocks.find((b) => b.name === blockName)
		}
	}

	function saveBlock() {
		if (validator.formHasErrors()) {
			return
		}

		const title = toUpdate.title ? String(toUpdate.title).trim() : undefined

		const filename = String(toUpdate.name)
		const newBlock = {
			name: filename,
			title: title !== '' ? title : undefined,
			rank: toUpdate.rank ? Number(toUpdate.rank) : highestRank,
			group: toUpdate.group ? String(toUpdate.group) : undefined,
			parent,
			tags: toUpdate.tags,
		}

		docService.createBlock(newBlock)

		dialogActor.close()
	}

	function deleteBlock() {
		if (!block) {
			errorBlockNotFound = true
		} else {
			errorBlockNotFound = false

			docService.deleteBlock({
				name: block.name as Uuid,
				content_type: block.content_type,
				group: block.group,
				parent,
			})
		}
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
	{#if block && cta === 'delete'}
		<label class="l:stack:xs font:sm variant:bare">
			Delete Block
			<input
				id="name"
				type="text"
				name="name"
				{color}
				value={block.name}
				required
				readonly
			/>
		</label>
	{:else if cta === 'save' || cta === 'update' || cta === 'copy'}
		<div class="l:sidebar size:lg">
			<div class="l:main l:stack maki:block:sm">
				<div class="l:flex align:end">
					<label class="l:stack:xs font:sm variant:bare">
						Add to Section
						<input
							id="parent"
							type="text"
							name="parent"
							class="size:xs font:sm"
							{color}
							value={toUpdate.parent}
							required
							readonly
						/>
					</label>
				</div>
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
						value={toUpdate.name}
						onchange={updateName}
						oninput={updateName}
						onblur={handleBlur}
						onfocus={handleFocus}
						layout="flex"
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
						hint="Optional: Title will be displayed in printed document"
						value={toUpdate.title}
						onchange={updateTitle}
						oninput={updateTitle}
						onblur={handleBlur}
						onfocus={handleFocus}
						{validator}
					/>
				</div>
				<div class="l:flex align:end">
					{#if subsections?.length}
						<label class="size:2xs font:sm">
							Group
							<select
								class="w:full size:2xs font:sm"
								name="subsections"
								id="subsections"
								onselect={updateGroup}
								onblur={updateGroup}
								onfocus={handleFocus}
							>
								<option class="size:xs font:xs" value={parent}>
									No subsection selected
								</option>
								{#each subsections as subsection, i (i)}
									<option class="size:xs font:xs" value={subsection.name}>
										{subsection.name}
									</option>
								{/each}
							</select>
						</label>
					{/if}
					<Input
						id="group"
						label="New Group"
						type="text"
						name="group"
						{color}
						font="sm"
						variant="bare"
						size="xs"
						asset="none"
						hint="Optional: Use groups to create subsections"
						onchange={updateGroup}
						oninput={updateGroup}
						onblur={handleBlur}
						onfocus={handleFocus}
						{validator}
					/>
				</div>
				<div class="l:flex align:end">
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
						value={highestRank}
						onchange={updateRank}
						oninput={updateRank}
						onblur={handleBlur}
						onfocus={handleFocus}
						{validator}
					/>
				</div>
			</div>

			<div class="l:side">
				<p class="font:sm font:heading font:bold ravioli:3xs">Add Tags</p>
				<div class="l:flex scroll:container contain:sm">
					<div class="scroll:y">
						<SelectTags
							id="tags"
							cta="save"
							oninput={updateTags}
							value={[]}
							tagGroups={tagService.tags}
						/>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div
		class={`l:flex justify:${errorBlockExists || errorCascadingName || errorBlockNotFound || errorNameNotAllowed ? 'between' : 'end'}`}
	>
		{#if errorBlockExists}
			<Feedback
				status="error"
				context="prose"
				variant="bare"
				asset="default"
				size="sm"
			>
				<p>
					A block named <span class="font:semibold font:sm"
						>{toUpdate.name}</span
					>
					already exists in
					<span class="font:semibold font:sm">{toUpdate.group}</span>
				</p>
			</Feedback>
		{/if}
		{#if block && errorBlockNotFound}
			<Feedback
				status="error"
				context="prose"
				variant="bare"
				asset="default"
				size="sm"
			>
				<p>
					Can't find block <span class="font:semibold font:sm">
						{block.name}
					</span>
				</p>
			</Feedback>
		{/if}
		{#if errorNameNotAllowed}
			<Feedback
				status="error"
				context="prose"
				variant="bare"
				asset="default"
				size="sm"
			>
				<p>
					A block cannot have the same name as its parent section: please choose
					a different name
				</p>
			</Feedback>
		{/if}
		{#if errorCascadingName}
			<Feedback
				status="error"
				context="prose"
				variant="bare"
				asset="default"
				size="sm"
			>
				<p>
					A block, subsection, and section cannot all share the same name: you
					must change the name of at least one of them
				</p>
			</Feedback>
		{/if}
		<div class="l:flex">
			<Button
				label="Cancel"
				id="block-dialog-reset"
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
				id="block-dialog-submit"
				name=""
				{color}
				variant="fill"
				shape="mellow"
				size="2xs"
				{disabled}
				onclick={cta === 'delete' ? deleteBlock : saveBlock}
			/>
		</div>
	</div>
</form>
