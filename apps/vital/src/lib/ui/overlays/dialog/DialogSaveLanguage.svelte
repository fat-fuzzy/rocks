<script lang="ts">
	import type {
		UiAssetType,
		UiColor,
		UiShape,
		UiSize,
		UiVariant,
	} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import FormLanguage from '$lib/ui/controls/settings/FormLanguage.svelte'
	import type {ICoordinateMetadata} from '$types'

	const {Button} = ui.blocks

	interface Props {
		id: string
		cta: 'save' | 'update' | 'copy'
		disabled?: boolean
		label?: string
		size?: UiSize
		font?: UiSize
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		asset?: string
		assetType?: UiAssetType
		coordMetadata: ICoordinateMetadata
	}
	let {
		id,
		cta,
		disabled,
		label = 'Add Language',
		size = '2xs',
		font = '2xs',
		color = 'accent',
		variant = 'outline',
		shape = 'mellow',
		asset,
		assetType,
		coordMetadata,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			size: 'md',
			color,
			label,
			position: 'nord-est',
			children: languageForm,
		})

		dialogActor.show()
	}
</script>

{#snippet languageForm()}
	<FormLanguage {color} {cta} {coordMetadata} />
{/snippet}

<!-- FIXME: add tooltip -->
<div class="l:stack maki:block">
	<Button
		{id}
		type="button"
		name={id}
		{size}
		font={`${font} nowrap`}
		{label}
		{color}
		{shape}
		{variant}
		{asset}
		{assetType}
		{disabled}
		onclick={showDialog}
	/>
</div>
