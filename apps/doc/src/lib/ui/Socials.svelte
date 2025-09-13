<script lang="ts">
	type Props = {
		color?: string
		variant?: string
		links: {
			title: string
			url: string
			shape?: string
			color?: string
			variant?: string
			size: string
			asset: string
		}[]
	}

	let {color = 'primary', variant = 'outline', links}: Props = $props()
</script>

<ul class="l:flex end unstyled">
	{#each links as { title, url, shape, size, asset }, i (i)}
		<li>
			<a
				class={`${variant} shape:${shape} color:${color} ${asset} size:${size}`}
				href={url}
				{title}
				aria-label={title}
			>
			</a>
		</li>
	{/each}
</ul>
