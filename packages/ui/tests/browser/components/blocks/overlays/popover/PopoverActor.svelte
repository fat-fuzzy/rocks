<script lang="ts">
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import {POPOVER_PROPS} from '$tests/fixtures/block-props'

	let {count = 1}: {count?: number} = $props()

	const popover1 = POPOVER_PROPS[0]
	const popover2 = POPOVER_PROPS[1]

	let popoverElement1: HTMLElement
	let popoverElement2: HTMLElement
	let invoker1: HTMLElement | undefined
	let invoker2: HTMLElement | undefined
</script>

<ff-popover
	id={`${popover1.props.id}-invoker`}
	bind:this={invoker1}
	data-testid={`${popover1.props.id}-invoker`}
>
	<span class="anchor" data-anchorid={`popover-anchor-${popover1.props.id}`}>
		<Button
			id={`button-popover-${popover1.props.id}`}
			type="button"
			title={popover1.props.title}
			name={`button-popover-${popover1.props.id}`}
			popovertarget={popover1.props.id}
		/>
	</span>
	<ff-reveal
		id={popover1.props.id}
		bind:this={popoverElement1}
		popover={popover1.props.invoke}
		data-testid={popover1.props.id}
	>
		{popover1.expected.content}
	</ff-reveal>
</ff-popover>

{#if count === 2}
	<ff-popover
		id={`${popover2.props.id}-invoker`}
		bind:this={invoker2}
		data-testid={`${popover2.props.id}-invoker`}
	>
		<span class="anchor" data-anchorid={`popover-anchor-${popover2.props.id}`}>
			<Button
				id={`button-popover-${popover2.props.id}`}
				type="button"
				title={popover2.props.title}
				name={`button-popover-${popover2.props.id}`}
				popovertarget={popover2.props.id}
			/>
		</span>
		<ff-reveal
			id={popover2.props.id}
			bind:this={popoverElement2}
			popover={popover2.props.invoke}
			data-testid={popover2.props.id}
		>
			{popover2.expected.content}
		</ff-reveal>
	</ff-popover>
{/if}

<style>
	ff-reveal {
		height: 100px;
		color: white;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: steelblue;
	}
</style>
