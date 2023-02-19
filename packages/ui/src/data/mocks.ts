const links = [
	{slug: '', title: 'Home'},
	{slug: 'about', title: 'About'},
]

const nav = [
	{
		slug: 'ui',
		title: 'RevealNav Example',
		items: [
			{
				slug: 'design-tokens',
				title: 'Design Tokens',
			},
			{
				slug: 'blocks',
				title: 'Block',
				items: [
					{slug: 'nav', title: 'Nav'},
					{slug: 'reveal-nav', title: 'RevealNav'},
				],
			},
			{
				slug: 'layouts',
				title: 'Layouts',
				items: [
					{slug: 'burrito', title: 'Burrito'},
					{slug: 'stack', title: 'Stack'},
				],
			},
		],
	},
]

const button = {id: 'idea', text: 'Idea', type: 'button', variant: '', emoji: '💡'}

const toggle = {id: 'favorite', text: 'Favorite', type: 'button', variant: '', emoji: '❤️'}

const menu = [
	{id: 'vader', text: 'Vader', asset: '👾'},
	{id: 'ollie', text: 'Ollie', asset: '🐙'},
	{id: 'moby', text: 'Moby', asset: '🐳'},
]

const toggleMenu = [
	{id: 'idea', text: 'Idea', asset: '💡'},
	{id: 'profile', text: 'Profile', asset: '🦁'},
	{id: 'favorite', text: 'Favorite', asset: '❤️'},
]

const radio = [
	{id: 'radio-1', label: 'Radio 1'},
	{id: 'radio-2', label: 'Radio 2'},
	{id: 'radio-3', label: 'Radio 3'},
]

const checkbox = [
	{id: 'check-1', label: 'Checkbox 1'},
	{id: 'check-2', label: 'Checkbox 2'},
	{id: 'check-3', label: 'Checkbox 3'},
]

const card = ['Card 1', 'Card 2', 'Card 3']
const form = ['Form input 1', 'Form input 2', 'Form input 3']

const textIntro = `<p>This is some text that shows you how text content will adapt inside a chosen Layout.</p>
<p>Layouts are components that are used to organize how content is displayed on the screen, and designed to work with the browser's native capabilities.`
const text = `${textIntro}
Based on the ideas of <a href="https://cube.fyi/" target="_blank" rel="noreferrer">CUBE CSS</a> and <a href="https://every-layout.dev/blog/algorithmic-design/" target="_blank" rel="noreferrer">Algorithmic Design</a>, these layouts use a combination of <a href="https://every-layout.dev/" target="_blank" rel="noreferrer">HTML markup and carefully written CSS</a> to allow a varied range of design options.</p>

<p>Containers are a type of Layout that limit the amount of horizontal space occupied by its contents. This means that containers can only affect: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties" target="_blank" rel="noreferrer">inline logical properties</a>, <code>width</code> and related properties, and spacing properties that affect horizontal dimensions (<code>padding-[left/right]</code>, etc).

<p>Layouts are designed to be combined in <a href="https://cube.fyi/composition.html" target="_blank" rel="noreferrer">Compositions</a>. This means that a Layout can contain other Layouts. This is a simple yet very versatile and powerful way to create web page designs.</p>
<p>NOTE: if the only direct child of a Container is another Container, it might be a good idea to review how that markup is constructed.</p>
` // TODO: lorem ipsum

const sketch = {
	id: '004',
	slug: 'geometry-2d',
	title: 'Geometry 2D ',
	emoji: '📐',
}

export default {
	links,
	nav,
	button,
	menu,
	toggle,
	toggleMenu,
	radio,
	checkbox,
	card,
	form,
	text,
	textIntro,
	sketch,
}
