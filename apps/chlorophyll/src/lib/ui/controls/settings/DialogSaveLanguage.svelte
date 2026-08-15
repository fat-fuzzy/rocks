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

	const {Button} = ui.blocks

	interface Props {
		id: string
		cta: 'save' | 'update' | 'copy'
		disabled?: boolean
		label?: string
		size?: UiSize
		color?: UiColor
		variant?: UiVariant
		shape?: UiShape
		asset?: string
		assetType?: UiAssetType
	}
	let {
		id,
		cta,
		disabled,
		label = 'Add Language',
		size = '2xs',
		color = 'accent',
		variant = 'outline',
		shape = 'mellow',
		asset,
		assetType,
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
	<FormLanguage {color} {cta} />
{/snippet}

<!-- FIXME: add tooltip -->
<div class="maki:block">
	<Button
		{id}
		type="button"
		name={id}
		{size}
		font="2xs font:heading nowrap"
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
