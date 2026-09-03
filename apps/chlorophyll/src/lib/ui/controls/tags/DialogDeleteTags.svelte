<script lang="ts">
	import type {
		UiAssetType,
		UiColor,
		UiShape,
		UiSize,
		UiVariant,
	} from '@fat-fuzzy/ui'
	import type {TagGroup} from '$types'

	import ui from '@fat-fuzzy/ui'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import FormTags from '$lib/ui/controls/tags/FormTags.svelte'

	const {Button} = ui.blocks

	interface Props {
		id: string
		groups: TagGroup[]
		cta: 'delete'
		label?: string
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		asset?: string
		assetType?: UiAssetType
		size?: UiSize
		font?: UiSize
	}
	let {
		id,
		cta,
		groups,
		label = 'Delete Tags',
		color = 'primary',
		variant = 'outline',
		shape = 'mellow',
		asset,
		assetType,
		size = '2xs',
		font = 'xs',
	}: Props = $props()

	const dialogSize = $derived(
		groups.length < 5
			? 'sm'
			: groups.length < 6
				? 'md'
				: groups.length < 8
					? 'lg'
					: 'xl',
	)

	function showDialog() {
		dialogActor.close()

		dialogActor.init({
			size: dialogSize,
			color,
			label: 'Delete Tags',
			position: 'nord-est',
			children: presetInfo,
		})

		dialogActor.show()
	}
</script>

{#snippet presetInfo()}
	<FormTags {color} {cta} {groups} />
{/snippet}

<!-- FIXME: add tooltip -->
<Button
	{id}
	type="button"
	name={id}
	{size}
	{font}
	justify="start nowrap"
	align="center"
	{label}
	{color}
	{shape}
	{variant}
	{asset}
	{assetType}
	onclick={showDialog}
/>
