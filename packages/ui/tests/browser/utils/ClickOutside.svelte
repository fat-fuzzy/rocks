<script lang="ts">
	import {clickOutside} from '$lib/utils/click-outside.dom'

	let outsideClicked = $state(false)

	function handleClickOutside(event: Event) {
		outsideClicked = true
	}
</script>

<div>
	<p use:clickOutside onclickoutside={handleClickOutside} class="click-outside">
		Click outside me!
	</p>
	<p class="outside">Outside!</p>
</div>

{#if outsideClicked}
	<output>Clicked outside!</output>
{/if}

<style>
	p,
	output {
		height: 100px;
		color: white;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.click-outside {
		background-color: steelblue;
	}

	.outside {
		background-color: darkslateblue;
	}

	output {
		background-color: deeppink;
	}
</style>
