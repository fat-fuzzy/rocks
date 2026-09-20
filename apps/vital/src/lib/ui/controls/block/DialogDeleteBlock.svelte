<script lang="ts">
	import type {Block, ICoordinateDocs, ICoordinateMetadata} from '$types'
	import type {UiAssetType, UiColor, UiShape, UiVariant} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'

	import FormBlock from '$lib/ui/controls/block/FormBlock.svelte'

	const {Button} = ui.blocks

	interface Props {
		id: string
		block?: Block
		sectionName: string
		label?: string
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		asset?: string
		assetType?: UiAssetType
		coordDocs: ICoordinateDocs
		coordMetadata: ICoordinateMetadata
	}
	let {
		id,
		block,
		sectionName,
		label = 'Delete Block',
		color = 'highlight',
		variant = 'outline',
		shape = 'mellow',
		asset,
		assetType,
		coordDocs,
		coordMetadata,
	}: Props = $props()

	function showDialog() {
		dialogActor.close()

		dialogActor.init({
			modal: true,
			size: 'sm',
			color,
			label: `Delete Block`,
			position: 'nord',
			children: presetInfo,
		})

		dialogActor.show()
	}
</script>

{#snippet presetInfo()}
	<FormBlock
		{block}
		cta="delete"
		parent={sectionName}
		{color}
		{coordDocs}
		{coordMetadata}
	/>
{/snippet}

<!-- FIXME: add tooltip -->
<Button
	{id}
	type="button"
	name={id}
	size="2xs"
	font="2xs font:heading"
	align="center"
	{label}
	{color}
	{shape}
	{variant}
	{asset}
	{assetType}
	onclick={showDialog}
/>
