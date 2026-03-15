<script lang="ts">
	type Props = {
		color?: string
		variant?: string
		links: {
			label: string
			url: string
			shape?: string
			color?: string
			variant?: string
			size: string
			asset: string
			assetType: string
		}[]
	}

	let {color = 'primary', variant = 'outline', links}: Props = $props()
</script>

<ul class="l:flex end unstyled">
	{#each links as { label, url, shape, size, asset, assetType }, i (i)}
		<li>
			<a
				class={`${variant} shape:${shape} color:${color} ${assetType}:${asset} size:${size}`}
				href={url}
				title={label}
				aria-label={label}
			>
			</a>
		</li>
	{/each}
</ul>
