<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {Picture} = ui.drafts

	let media = $derived($page.data)
</script>

<dialog class="l:frame w:full l:sidebar:2xs bg:inherit" open>
	<form method="dialog" class="l:side hug">
		<button
			onclick={() => history.back()}
			class="bg:primary variant:fill size:xs"
		>
			Back
		</button>
	</form>
	<div class="l:main:90 col:center">
		{#if media.path === 'images'}
			<Picture
				src={media.src}
				ext={media.ext}
				alt={media.alt}
				orientation={media.orientation}
				width="1645"
				height="2465"
				sources={[['1645', '2465', media.ext]]}
			/>
		{/if}
	</div>
</dialog>
