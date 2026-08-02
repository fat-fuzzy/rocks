<script lang="ts">
	import type {UiColor, UiContainer, UiLayout, UiSize} from '@fat-fuzzy/ui'
	import type {TagGroup, InputGroupMenus} from '$types'

	import ui from '@fat-fuzzy/ui'

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
		cta: 'save' | 'delete'
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
			? tagGroups.filter(
					(tg) => tg.name !== 'twilight-z' && tg.name !== 'version',
				)
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
	{#each groups as group, i (i)}
		<InputGroup
			id={cta === 'delete'
				? `${cta}-${group.name}`
				: `${cta}-${id}-${group.name}`}
			name={cta === 'delete'
				? `${cta}-${group.name}`
				: `${cta}-${id}-${group.name}`}
			legend={group.title}
			type={cta === 'delete' || !group.type ? 'checkbox' : group.type}
			value={value.filter((t) => group.items.includes(t))}
			size="2xs"
			{color}
			variant="bare"
			selectAll={true}
			items={tags[group.name]}
			{oninput}
		/>
	{/each}
</div>
