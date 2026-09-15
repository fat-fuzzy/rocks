<script lang="ts">
	import {resolve} from '$app/paths'
	import type {RouteId} from '$types'

	type Props = {
		color?: string
		variant?: string
		links: {
			title: string
			url: RouteId
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
				class={`${variant} shape:${shape} color:${color} ${asset} justify:start size:${size}`}
				href={resolve(url)}
			>
				<span class="maki:inline size:3xs">{title}</span>
			</a>
		</li>
	{/each}
</ul>
