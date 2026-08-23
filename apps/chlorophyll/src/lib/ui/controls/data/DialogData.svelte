<script lang="ts">
	import type {UiColor, UiSize} from '@fat-fuzzy/ui'

	import {SvelteURL} from 'svelte/reactivity'
	import ui from '@fat-fuzzy/ui'

	import {page} from '$app/state'

	import dialogActor from '$lib/ui/overlays/dialog/actor.svelte'
	import FormData from '$lib/ui/controls/data/FormData.svelte'
	import Export from '$lib/ui/controls/data/Export.svelte'

	const {Button} = ui.blocks

	interface Props {
		id: string
		label?: string
		color?: UiColor
		size?: UiSize
		font?: UiSize
		oninput?: () => void // hook for parent to refresh state
	}
	let {
		id,
		label = 'Manage Data',
		color = 'primary',
		size = '2xs',
		font = '2xs',
		oninput,
	}: Props = $props()

	function showDialog() {
		dialogActor.init({
			modal: false,
			size: 'lg',
			color,
			label: 'Manage Data',
			position: 'nord-est',
			children: dialogContent,
		})

		dialogActor.show()
	}

	function refreshAndClose() {
		if (oninput) {
			oninput()
		}

		setTimeout(() => {
			const newUrl = new SvelteURL(page.url)
			newUrl.search = ''

			window.location.href = newUrl.href // FIXME: hacky solution to reload for now

			dialogActor.close()
		}, 1500)
	}
</script>

{#snippet dialogContent()}
	<div class="l:sidebar size:lg">
		<div class="l:main l:flex align:center justify:between">
			<h4 class="font:heading">To backup your data:</h4>
		</div>
		<div class="l:side">
			<Export {color} {id} filename={id} />
		</div>
	</div>
	<FormData {color} onsubmit={refreshAndClose} />
{/snippet}

<Button
	{id}
	type="button"
	name={id}
	{size}
	{font}
	{color}
	layout="flex"
	justify="end nowrap"
	align="center"
	shape="mellow"
	variant="outline"
	onclick={showDialog}
>
	<span class="font:heading">{label}</span>
	<ff-con class={`svg:arrow-bar-down size:${size} l:flex`}></ff-con>
</Button>
