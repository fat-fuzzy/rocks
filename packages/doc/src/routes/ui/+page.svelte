<script lang="ts">
	import { blocks, stories } from '@fat-fuzzy/ui';
	const { Button, Canvas, Menu } = blocks;
	const { Story } = stories;
</script>

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy UI Library documentation" />
</svelte:head>
<h1>UI Library Stories</h1>
<Story
	title="Button"
	slug="button-1"
	componentProps={{ size: 'md', theme: 'dark', variant: 'primary' }}
	storyProps={{
		icons: [],
		sizes: ['sm', 'md'],
		variants: ['outline', 'primary'],
		themes: ['light', 'dark']
	}}
	children=""
>
	<Button size="md" variant="primary" slot="component">Button with child text</Button>
</Story>
<Story
	title="Button 2"
	slug="button-2"
	componentProps={{
		size: 'md',
		theme: 'dark',
		variant: 'outline',
		text: 'Button with text prop'
	}}
	storyProps={{
		icons: [],
		sizes: ['sm', 'md'],
		variants: ['outline', 'primary'],
		themes: ['light', 'dark']
	}}
	children=""
	component={Button}
/>
<Story
	title="Menu"
	slug="menu"
	componentProps={{
		size: 'md',
		theme: 'dark',
		variant: 'primary',
		text: 'Button with text prop'
	}}
	storyProps={{
		icons: [],
		sizes: ['sm', 'md'],
		variants: ['outline', 'primary'],
		themes: ['light', 'dark']
	}}
	children=""
	component={Menu}
/>
<Story
	title="Canvas"
	slug="canvas"
	componentProps={{ size: 'md', sketch: '' }}
	storyProps={{
		icons: [],
		sizes: ['sm', 'md'],
		variants: ['outline', 'primary'],
		themes: ['light', 'dark']
	}}
	children=""
	component={Canvas}
/>
