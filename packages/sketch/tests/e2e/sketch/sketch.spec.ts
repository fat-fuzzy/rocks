import {expect, test} from '@playwright/test'
import gfx from '@fat-fuzzy/gfx'

const sketches = gfx.gl.sketches.learning
	.filter((sketch) => !sketch.meta.draft)
	.map((sketch) => sketch.meta)
let currentEvent
let previousEvent
let sketchState
let canvasState
let playerState
let controlsState

/**
 * Test the Player Play button works as expected for each sketch.
 */
sketches.map((sketch) => {
	test(`"${sketch.title}" sketch loads OK`, async ({page}) => {
		await page.goto(`/${sketch.slug}`)
		const hasControls =
			sketch.controls?.length > 1 ||
			(sketch.controls?.length === 1 && sketch.controls[0] !== 'loop')

		// Expects page to have a heading with the name the Sketch
		await expect(page.getByRole('heading', {name: 'Play'})).toBeVisible()
		await expect(
			page.getByRole('heading', {name: ` ❤︎ ${sketch.title}`}),
		).toBeVisible()

		previousEvent = page
			.getByTestId('debug-table')
			.getByTestId(`debug-event-sketch`)
			.getByTestId(`previous-event`)

		currentEvent = page
			.getByTestId('debug-table')
			.getByTestId(`debug-event-sketch`)
			.getByTestId(`current-event`)

		await expect(previousEvent).toHaveText('loadOk')
		await expect(currentEvent).toHaveText('loadOk')

		sketchState = page
			.getByTestId('debug-table')
			.getByTestId(`debug-state-sketch`)

		canvasState = page
			.getByTestId('debug-table')
			.getByTestId(`debug-state-canvas`)

		playerState = page
			.getByTestId('debug-table')
			.getByTestId(`debug-state-player`)

		controlsState = page
			.getByTestId('debug-table')
			.getByTestId(`debug-state-controls`)

		await expect(sketchState).toHaveText('active')
		await expect(canvasState).toHaveText('idle')
		await expect(playerState).toHaveText('idle')

		if (hasControls) {
			await expect(controlsState).toHaveText('hidden')
		}
	})
})
