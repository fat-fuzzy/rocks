<script lang="ts">
	import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'
	import type {ICoordinateImports} from '$types'

	import {SvelteURL} from 'svelte/reactivity'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import FormData from '$lib/ui/controls/data/FormData.svelte'

	const {Button} = ui.blocks

	interface Props {
		id: string
		label?: string
		color?: UiColor
		variant?: UiVariant
		size?: UiSize
		font?: UiSize
		oninput?: () => void // hook for parent to refresh state
		coordImports: ICoordinateImports
	}
	let {
		id,
		label = 'Your data',
		color = 'neutral',
		variant = 'outline',
		size = '2xs',
		font = 'xs',
		oninput,
		coordImports,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			modal: false,
			size: 'lg',
			color,
			label: 'Your data',
			position: 'nord-est',
			children: dialogContent,
		})

		dialogActor.show()
	}

	function handleSubmit() {
		if (oninput) {
			oninput()
		}

		setTimeout(() => {
			dialogActor.close()

			coordImports.setStatus('idle')

			const newUrl = new SvelteURL(page.url)
			newUrl.search = ''

			window.location.href = newUrl.href // FIXME: hacky solution to reload for now
		}, 1000)
	}
</script>

{#snippet dialogContent()}
	<FormData {color} onsubmit={handleSubmit} {coordImports} />
{/snippet}

<Button
	{id}
	type="button"
	name={id}
	{size}
	{font}
	{color}
	{variant}
	layout="flex"
	justify="between nowrap"
	align="center"
	onclick={showDialog}
>
	<span class="font:heading">{label}</span>
	<ff-icon class={`svg:arrow-bar-down size:${size} l:flex`}></ff-icon>
</Button>
