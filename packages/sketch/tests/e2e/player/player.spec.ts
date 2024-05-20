import {expect, test} from '@playwright/test'
import lib from '@fat-fuzzy/lib'

const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)
let previousEvent
let currentEvent
let events = []

test('Player loads in idle state', async ({page}) => {
	await page.goto('/random-rect')

	// Expects the Player to enable the available action: Play
	await expect(page.getByRole('button', {name: 'play'})).toBeEnabled()
	// Expects the Player to disable unavailable actions: Stop, Clear
	await expect(page.getByRole('button', {name: 'stop'})).toBeDisabled()
	await expect(page.getByRole('button', {name: 'clear'})).toBeDisabled()
})

/**
 * Test the Player loads in idle state for each sketch.
 */
await Promise.all(
	sketches.map((sketch) => {
		test(`${sketch.title} Player loads in idle state`, async ({page}) => {
			await page.goto(`/${sketch.slug}`)

			// Expects the Player to enable the available action: Play
			await expect(page.getByRole('button', {name: 'play'})).toBeEnabled()
			// Expects the Player to disable unavailable actions: Stop, Clear
			await expect(page.getByRole('button', {name: 'stop'})).toBeDisabled()
			await expect(page.getByRole('button', {name: 'clear'})).toBeDisabled()
		})
	}),
)

/**
 * Test the Player Play button works as expected for each sketch.
 */
await Promise.all(
	sketches.map((sketch) => {
		test(`${sketch.title} Play button works as expected`, async ({page}) => {
			await page.goto(`/${sketch.slug}`)

			// Expects the Play button to start the canvas animation
			await page.getByRole('button', {name: '✨ Play'}).click()

			// Expects the Player to enable available actions: Stop, Clear
			await expect(page.getByRole('button', {name: 'stop'})).toBeEnabled()
			await expect(page.getByRole('button', {name: 'clear'})).toBeEnabled()

			previousEvent = page
				.getByTestId('debug-table')
				.getByTestId(`debug-event-player`)
				.getByTestId(`previous-event`)

			currentEvent = page
				.getByTestId('debug-table')
				.getByTestId(`debug-event-player`)
				.getByTestId(`current-event`)

			events = await Promise.all([previousEvent, currentEvent])

			// TODO: Fix initial player state ? or this test
			await expect(events[0]).toHaveText('play')
			// await expect(events[0]).toHaveText('idle')
			// if (
			// 	// sketch.controls.includes('camera') || 	// TODO: Fix this control update
			// 	sketch.controls.includes('geometry-2d') ||
			// 	sketch.controls.includes('geometry-3d') ||
			// 	sketch.controls.includes('matrix-2d') ||
			// 	sketch.controls.includes('matrix-3d')
			// ) {
			// 	await expect(events[0]).toHaveText('update')
			// } else {
			// 	await expect(events[0]).toHaveText('play')
			// }

			// Expects the Pause button to pause the canvas animation
			// TODO: Fix asset emoji:pause
			await page.getByRole('button', {name: '✨ Pause'}).click()
			events = await Promise.all([previousEvent, currentEvent])

			if (
				// TODO: Fix camera control update
				// sketch.controls.includes('camera') ||
				sketch.controls.includes('geometry-2d') ||
				sketch.controls.includes('geometry-3d') ||
				sketch.controls.includes('matrix-2d') ||
				sketch.controls.includes('matrix-3d')
			) {
				await expect(events[0]).toHaveText('update')
			} else {
				await expect(events[0]).toHaveText('play')
			}
			await expect(events[1]).toHaveText('pause')

			// Actions should be enabled
			await expect(page.getByRole('button', {name: 'stop'})).toBeEnabled()
			await expect(page.getByRole('button', {name: 'clear'})).toBeEnabled()

			// Expects the Play button to resume the canvas animation
			await page.getByRole('button', {name: '✨ Play'}).click()
			events = await Promise.all([previousEvent, currentEvent])
			await expect(events[1]).toHaveText('play')

			// Actions should be enabled
			await expect(page.getByRole('button', {name: 'stop'})).toBeEnabled()
			await expect(page.getByRole('button', {name: 'clear'})).toBeEnabled()
		})
	}),
)
