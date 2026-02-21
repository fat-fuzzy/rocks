const REVEAL_PROPS = [
	{
		props: {
			id: 'test-reveal-1',
			name: 'test-reveal-1',
			title: 'Test Reveal 1',
			label: 'Test Reveal 1',
			auto: false,
			// method: 'POST', // TODO: change to GET with params
			// formaction,
			// redirect,
			// layout,
			reveal: 'collapsed',
			place: 'top',
			element: 'div', // HTML tag or tag.class
			// position,
			// color,
			// size,
			// shape,
			// font,
			// breakpoint,
			// variant,
			// align,
			// justify,
			scroll,
			// height,
			// background,
			// layer,
			// asset,
			// children,
		},
		expected: {content: 'Reveal Content 1'},
	},
]

export {REVEAL_PROPS}
