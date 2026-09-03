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
		cta: 'save' | 'update' | 'copy'
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
		label = 'Save Tag',
		color = 'primary',
		variant = 'outline',
		shape = 'mellow',
		asset,
		assetType,
		size = '2xs',
		font = '2xs', // TODO: figure out why '2xs' here, and 'xs' in DialogDeleTags
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
			size: 'lg',
			color,
			label: `${action} Tag`,
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
