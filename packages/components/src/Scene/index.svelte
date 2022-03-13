<script>
	import { onMount } from 'svelte'
	import { session } from '$app/stores'
	// import marked from 'marked'

	// import ArticleMeta from './_ArticleMeta.svelte'
	// import CommentContainer from './_CommentContainer.svelte'

	export let scene
	export let slug

	// let commentErrors,
	// 	comments = [] // we'll lazy-load these in onMount
	// $: markup = marked(scene.body)

	onMount(() => {
		// api.get(`scenes/${slug}/comments`).then((res) => {
		// 	comments = res.comments
		// })
	})
</script>

<svelte:head>
	<title>{scene.name}</title>
</svelte:head>

<div class="scene-page">
	<div class="banner">
		<div class="container">
			<h1>{scene.name}</h1>
			<!-- <ArticleMeta {scene} user={$session.user} /> -->
		</div>
	</div>

	<div class="container page">
		<div class="row scene-content">
			<div class="col-xs-12">
				<!-- <div>{@html markup}</div> -->

				<ul class="tag-list">
					<!-- {#each scene.tagList as tag}
						<li class="tag-default tag-pill tag-outline">
							{tag}
						</li>
					{/each} -->
				</ul>
			</div>
		</div>

		<hr />

		<div class="scene-actions" />

		<div class="row">
			<!-- <CommentContainer {slug} {comments} user={$session.user} errors={commentErrors} /> -->
		</div>
	</div>
</div>
