<script lang="ts">
	import type {DialogProps} from '$types'
	import actor from '$lib/ui/overlays/dialog/actor.svelte'

	import ui from '@fat-fuzzy/ui'

	const {Button} = ui.blocks

	let dialog: HTMLDialogElement

	let {
		labelId,
		label,
		level,
		size,
		shape = 'mellow',
		justify,
		position,
		cta,
		color = 'primary',
		children,
	}: DialogProps = $derived(actor.props)

	$effect(() => {
		if (dialog) {
			actor.setDialog(dialog)
		}
	})
</script>

<dialog
	bind:this={dialog}
	class={`size:${size} l:stack:${size} coords:${position} shape:${shape}`}
>
	<div
		class="dialog-header l:flex w:full align:center justify:between raviolink"
	>
		{#if level && label}
			<svelte:element this={`h${level}`} id={labelId}>
				{label}
			</svelte:element>
		{:else if label}
			<p class="font:heading">{label}</p>
		{/if}
		<form method="dialog" novalidate>
			<Button
				label="Close"
				id="dialog-close"
				name="dialog-close"
				{color}
				variant="bare"
				shape="pill"
				size="2xs"
				onclick={() => actor.close()}
			/>
		</form>
	</div>
	<div class="dialog-content">
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if cta}
		<footer class={`l:flex justify:${justify} raviolink`}>
			<menu class="actions unstyled l:switcher:3xs threshold:xs hug">
				<Button
					label="Cancel"
					id="dialog-reset"
					name="dialog-reset"
					type="reset"
					{color}
					variant="outline"
					size="2xs"
					onclick={() => actor.cancel()}
				/>
				<Button
					label={cta ? cta : 'Submit'}
					id="dialog-submit"
					name="dialog-submit"
					justify="auto"
					{color}
					variant="fill"
					size="2xs"
					onclick={() => actor.submit()}
				/>
			</menu>
		</footer>
	{/if}
</dialog>
