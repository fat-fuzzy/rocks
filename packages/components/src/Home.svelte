<script>
	import { onMount } from 'svelte'
	import Playground from './Playground/index.svelte'
	import Tags from './Tags.svelte'
	// import * as api from '$lib/api.js'

	export let p = 1

	let tab
	let tag
	let tags

	function setTags({ detail }) {
		tag = detail.tag
		tab = 'tag'
	}

	onMount(async () => {
		// ;({ tags } = await api.get('tags'))
		;({ tags } = await Promise.resolve({ tags: ['webgl', '2d', '3d', 'interactive'] }))
	})
</script>

<svelte:head>
	<title>Playground</title>
</svelte:head>

<div class="home-page">
	<div class="banner">
		<div class="container">
			<h1 class="logo-font">Playground</h1>
			<p>Play with the browser canvas</p>
		</div>
	</div>

	<div class="container page">
		<div class="row">
			<Playground {p} {tag} bind:tab />

			<div class="col-md-3">
				<div class="sidebar">
					<p>Popular Tags</p>
					<Tags {tags} on:select={setTags} />
				</div>
			</div>
		</div>
	</div>
</div>
