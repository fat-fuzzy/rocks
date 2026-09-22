<script lang="ts">
	import type {
		UiAssetType,
		UiColor,
		UiShape,
		UiSize,
		UiVariant,
	} from '@fat-fuzzy/ui'
	import type {ICoordinateDocs, Slug} from '$types'

	import ui from '@fat-fuzzy/ui'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import FormSection from '$lib/ui/controls/section/FormSection.svelte'

	const {Button} = ui.blocks

	interface Props {
		id: string
		formats: Slug[]
		cta: 'save' | 'update' | 'copy'
		label?: string
		size?: UiSize
		font?: UiSize
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		asset?: string
		assetType?: UiAssetType
		coordDocs: ICoordinateDocs
	}
	let {
		id,
		formats,
		size = 'xs',
		font = 'xs',
		cta,
		label = 'Save Section',
		color = 'primary',
		variant = 'outline',
		shape = 'mellow',
		asset,
		assetType,
		coordDocs,
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
			size: 'xl',
			color,
			label: `${action} Section`,
			position: 'nord',
			children: sectionForm,
		})

		dialogActor.show()
	}
</script>

{#snippet sectionForm()}
	<FormSection {color} {cta} {formats} {coordDocs} />
{/snippet}

<!-- FIXME: add tooltip -->
<div class="l:flex justify:end">
	<Button
		{id}
		type="button"
		name={id}
		{size}
		{font}
		align="center"
		{label}
		{color}
		{shape}
		{variant}
		{asset}
		{assetType}
		onclick={showDialog}
	/>
</div>
