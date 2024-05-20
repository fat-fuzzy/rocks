import {expect, test} from '@playwright/test'
import lib from '@fat-fuzzy/lib'

const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)
let previousEvent
let currentEvent
let events = []
let sketchState
let canvasState
let playerState
let controlsState
let states = []
/**
 * Test the Player Play button works as expected for each sketch.
 */
await Promise.all(
	sketches.map((sketch) => {
		test.skip(`${sketch.title} Clear button works as expected`, async ({
			page,
		}) => {
			await page.goto(`/${sketch.slug}`)

			previousEvent = page
				.getByTestId('debug-table')
				.getByTestId(`debug-event-player`)
				.getByTestId(`previous-event`)

			currentEvent = page
				.getByTestId('debug-table')
				.getByTestId(`debug-event-player`)
				.getByTestId(`current-event`)

			sketchState = page
				.getByTestId('debug-table')
				.getByTestId(`debug-state-sketch`)

			canvasState = page
				.getByTestId('debug-table')
				.getByTestId(`debug-state-canvas`)

			playerState = page
				.getByTestId('debug-table')
				.getByTestId(`debug-state-player`)

			states = await Promise.all([sketchState, canvasState, playerState])
			await expect(states[0]).toHaveText('active')
			await expect(states[1]).toHaveText('idle')
			await expect(states[2]).toHaveText('idle')
			if (
				sketch.controls?.length > 1 ||
				(sketch.controls?.length === 1 && sketch.controls[0] !== 'loop')
			) {
				controlsState = page
					.getByTestId('debug-table')
					.getByTestId(`debug-state-controls`)
				await expect(controlsState).toHaveText('pristine')
			}

			// Start the canvas animation
			await page.getByRole('button', {name: '✨ Play'}).click()

			// Expects the Clear to be enabled
			await expect(page.getByRole('button', {name: 'clear'})).toBeEnabled()

			// TODO: Fix controls state update - should be:
			// - `hidden` on load until `play`
			// - `pristine` on `play` until user interaction
			// - `pristine` (or `cleared` ?) on `clear` until user interaction
			// - `pristine` on `stop` until user interaction
			// - `updated` on user interaction until` `clear`
			// - `paused` on `pause`, then:
			//   - `updated` or `pristine` (the state previous to `paused`) on `play`
			//   - `pristine` on `clear`, then as above
			// - `hidden` on `stop`, then as above

			if (
				sketch.controls?.length > 1 ||
				(sketch.controls?.length === 1 && sketch.controls[0] !== 'loop')
			) {
				controlsState = page
					.getByTestId('debug-table')
					.getByTestId(`debug-state-controls`)
				await expect(controlsState).toHaveText('updated')
			}

			// Clear the canvas
			await page.getByRole('button', {name: '🐳 Clear'}).click()

			events = await Promise.all([previousEvent, currentEvent])
			await expect(events[0]).toHaveText('play')
			await expect(events[1]).toHaveText('clear')

			states = await Promise.all([sketchState, canvasState, playerState])
			await expect(states[0]).toHaveText('active')
			await expect(states[1]).toHaveText('playing')
			await expect(states[2]).toHaveText('playing')
			if (
				sketch.controls?.length > 1 ||
				(sketch.controls?.length === 1 && sketch.controls[0] !== 'loop')
			) {
				controlsState = page
					.getByTestId('debug-table')
					.getByTestId(`debug-state-controls`)
				await expect(controlsState).toHaveText('pristine')
			}

			// Pause the animation
			await page.getByRole('button', {name: '✨ Pause'}).click()

			events = await Promise.all([previousEvent, currentEvent])
			await expect(events[0]).toHaveText('clear')
			await expect(events[1]).toHaveText('pause')

			states = await Promise.all([sketchState, canvasState, playerState])
			await expect(states[0]).toHaveText('active')
			await expect(states[1]).toHaveText('paused')
			await expect(states[2]).toHaveText('paused')
			if (
				sketch.controls?.length > 1 ||
				(sketch.controls?.length === 1 && sketch.controls[0] !== 'loop')
			) {
				controlsState = page
					.getByTestId('debug-table')
					.getByTestId(`debug-state-controls`)
				await expect(controlsState).toHaveText('pristine')
			}

			// Clear the canvas
			await page.getByRole('button', {name: 'clear'}).click()
			events = await Promise.all([previousEvent, currentEvent])
			await expect(events[0]).toHaveText('pause')
			await expect(events[1]).toHaveText('clear')

			states = await Promise.all([sketchState, canvasState, playerState])
			await expect(states[0]).toHaveText('active')
			await expect(states[1]).toHaveText('paused')
			await expect(states[2]).toHaveText('paused')
			if (
				sketch.controls?.length > 1 ||
				(sketch.controls?.length === 1 && sketch.controls[0] !== 'loop')
			) {
				controlsState = page
					.getByTestId('debug-table')
					.getByTestId(`debug-state-controls`)
				await expect(controlsState).toHaveText('pristine')
			}

			// Stop, Play / Pause and Clear Actions should be enabled
			await expect(page.getByRole('button', {name: 'play'})).toBeEnabled()
			await expect(page.getByRole('button', {name: 'stop'})).toBeEnabled()
			await expect(page.getByRole('button', {name: 'clear'})).toBeEnabled()
		})
	}),
)
