import {expect, test} from '@playwright/test'
import lib from '@fat-fuzzy/lib'

const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)
let debugTable
let currentEvent
let previousEvent
let events = []
let sketchState
let canvasState
let playerState
let controlsState
let states = []
let sketchActions
let canvasActions
let playerActions
let controlsActions

/**
 * Test the Player Play button works as expected for each sketch.
 */
await Promise.all(
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

			events = await Promise.all([previousEvent, currentEvent])
			await expect(events[0]).toHaveText('load')
			await expect(events[1]).toHaveText('loadOk')

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

			states = await Promise.all([sketchState, canvasState, playerState])
			await expect(states[0]).toHaveText('active')
			await expect(states[1]).toHaveText('idle')
			await expect(states[2]).toHaveText('idle')

			if (hasControls) {
				await expect(controlsState).toHaveText('hidden')
			}
		})
	}),
)
