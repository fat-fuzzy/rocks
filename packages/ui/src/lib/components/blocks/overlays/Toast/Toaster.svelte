<script lang="ts">
	import {onMount} from 'svelte'
	import Toast from '$lib/components/blocks/overlays/Toast/Toast.svelte'
	import toastChef from '$lib/components/blocks/overlays/Toast/actor.svelte'

	let ref: HTMLElement

	onMount(() => {
		toastChef.initialize(ref)
	})
</script>

<aside bind:this={ref} class="toaster">
	{#each toastChef.toasts as toast (toast.id)}
		<Toast {...toast} />
	{/each}
</aside>
