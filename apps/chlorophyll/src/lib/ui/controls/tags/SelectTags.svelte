<script lang="ts">
	import type {UiColor, UiContainer, UiLayout, UiSize} from '@fat-fuzzy/ui'
	import type {TagGroup, InputGroupMenus, ActionCrud} from '$types'

	import ui from '@fat-fuzzy/ui'

	import {getTagGroupName} from '$lib/common/tags'

	const {InputGroup} = ui.blocks
	const {styles} = ui.utils

	const {
		id,
		cta,
		value,
		size = '2xs',
		layout = 'flex',
		color = 'primary',
		container,
		oninput,
		tagGroups,
	}: {
		id: string
		cta: ActionCrud
		value: string[]
		color?: UiColor
		size?: UiSize
		layout?: UiLayout
		tagGroups: TagGroup[]
		container?: UiContainer
		oninput: (e: Event) => void
	} = $props()

	let layoutClasses = $derived(
		styles.getStyles({
			layout,
			container,
			containerSize: container ? 'lg' : undefined,
			size: size,
			align: 'start',
			justify: 'between',
		}),
	)

	// Do not delete the Twilight Zone:
	// It's used for utility tags, and it's the only way to display untagged blocks
	// Do not delete Version:
	// It's the only way to enable mutually exclusive content variations
	// FIXME: enable single tag version deletion (+ tag rename)
	let groups = $derived(
		cta === 'delete'
			? tagGroups.filter((tg) => tg.name !== 'twilight-z')
			: tagGroups,
	)

	let tags = $derived.by(() => {
		const menuItems = groups.reduce(
			(
				menus: InputGroupMenus,
				{title, name, items}: TagGroup,
			): InputGroupMenus => {
				const menuItems = items.map((i: string) => {
					return {
						id: i,
						name,
						value: i,
						checked: value.includes(i) ? true : undefined,
						label: i,
						color,
						title: title ?? name,
					}
				})

				menus[name] = menuItems
				return menus
			},
			{},
		)
		return menuItems
	})
</script>

<div class={layoutClasses}>
	{#if cta === 'delete' && groups.length === 0}
		<div class="ravioli:xs font:sm shape:mellow surface:1:neutral">
			<p class="font:heading font:semibold text:center">
				No custom tag groups found
			</p>
		</div>
	{:else}
		{#each groups as { name, title, type, items }, i (i)}
			{@const groupId = getTagGroupName(cta, name, id)}
			<InputGroup
				id={groupId}
				name={groupId}
				legend={title}
				type={cta === 'delete' || !type ? 'checkbox' : type}
				value={value.filter((t) => items.includes(t))}
				size="2xs"
				{color}
				variant="bare"
				selectAll={true}
				items={tags[name]}
				{oninput}
			/>
		{/each}
	{/if}
</div>
