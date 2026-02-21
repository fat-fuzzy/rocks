<script lang="ts">
	import {onMount} from 'svelte'
	import Popover from '$lib/components/blocks/overlays/Popover/Popover.svelte'
	import {POPOVER_PROPS} from '$tests/fixtures/block-props'
	import popoverActor from '$lib/components/blocks/overlays/Popover/actor.svelte'

	let {
		count = 1,
		externalEvent = false,
	}: {count?: number; externalEvent?: boolean} = $props()

	const popover1 = POPOVER_PROPS[0]
	const popover2 = POPOVER_PROPS[1]

	let boundForm: HTMLFormElement | undefined = $state()
	let formData: FormData | undefined = $state()

	function handleSubmit(e: Event) {
		e.preventDefault()
		if (!formData) {
			return
		}
		const popoverId = formData.get('popover-id')
		if (popoverId) {
			popoverActor.hidePopover(String(popoverId))
		}
	}

	onMount(() => {
		if (boundForm) {
			formData = new FormData(boundForm)
		}
	})
</script>

<Popover {...popover1.props}>
	<p>{popover1.expected.content}</p>
</Popover>

{#if count === 2}
	<Popover {...popover2.props}>
		<p>{popover2.expected.content}</p>
	</Popover>
{/if}

{#if externalEvent}
	<form onsubmit={handleSubmit}>
		<label>
			Enter the popoverId
			<input name="popover-id" type="text" />
			<button>Save and close</button>
		</label>
	</form>
{/if}

<p class="click-outside">Click outside</p>

<style>
	.click-outside {
		background-color: steelblue;
		height: 100px;
		color: white;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
