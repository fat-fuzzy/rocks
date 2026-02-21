<script lang="ts">
	import {clickOutside} from '$lib/utils/browser/click-outside'

	let outsideClicked = $state(false)

	function handleClickOutside(event: Event) {
		outsideClicked = true
	}
</script>

<div>
	<p
		use:clickOutside={{callback: handleClickOutside, ignore: ['ignored']}}
		class="click-outside"
	>
		Click outside me!
	</p>
	<p class="outside">Outside!</p>
	<p id="ignored" class="outside-ignore">Ignore my event!</p>
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

	.outside-ignore {
		background-color: orange;
	}

	output {
		background-color: deeppink;
	}
</style>
