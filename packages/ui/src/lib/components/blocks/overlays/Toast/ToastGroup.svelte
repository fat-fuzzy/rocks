<script lang="ts">
	import {onMount} from 'svelte'
	import Toast from '$lib/components/blocks/overlays/Toast/Toast.svelte'
	import toaster from '$lib/components/blocks/overlays/Toast/actor.svelte'

	let toasts: HTMLElement

	onMount(() => {
		if (toasts) {
			toaster.initialize(toasts)
		}
	})
</script>

<aside bind:this={toasts} class="toaster">
	{#each toaster.toasts as toast (toast.id)}
		<Toast {...toast} />
	{/each}
</aside>
