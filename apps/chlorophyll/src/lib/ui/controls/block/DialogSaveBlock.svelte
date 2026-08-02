<script lang="ts">
	import type {UiAssetType, UiColor, UiShape, UiVariant} from '@fat-fuzzy/ui'
	import type {Subsection} from '$types'

	import ui from '@fat-fuzzy/ui'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'

	import FormBlock from '$lib/ui/controls/block/FormBlock.svelte'

	const {Button} = ui.blocks

	interface Props {
		id: string
		sectionName: string
		subsections: Subsection[]
		cta: 'save' | 'update' | 'copy'
		label?: string
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		asset?: string
		assetType?: UiAssetType
	}
	let {
		id,
		sectionName,
		subsections,
		cta,
		label = 'Save Block',
		color = 'primary',
		variant = 'outline',
		shape = 'mellow',
		asset,
		assetType,
	}: Props = $props()

	let action = $derived(
		cta === 'save'
			? 'Add'
			: cta === 'update'
				? 'Update'
				: cta === 'copy'
					? 'Copy'
					: 'Submit',
	)

	function showDialog() {
		dialogActor.close()

		dialogActor.init({
			modal: true,
			size: '2xl',
			color,
			label: `${action} Block`,
			position: 'nord',
			children: presetInfo,
		})

		dialogActor.show()
	}
</script>

{#snippet presetInfo()}
	<FormBlock {color} {cta} parent={sectionName} {subsections} />
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
