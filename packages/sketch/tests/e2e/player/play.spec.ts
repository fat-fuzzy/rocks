import {expect, test} from '@playwright/test'
import lib from '@fat-fuzzy/lib'

const sketches = lib.gfx.sketches.map((sketch) => sketch.meta)
let previousEvent
let currentEvent
let events = []

/**
 * Test the Player's Play/Pause button works as expected for each sketch.
 */
await Promise.all(
	sketches.map((sketch) => {
		test(`"${sketch.title}" sketch: Play button works as expected`, async ({
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

			events = await Promise.all([previousEvent, currentEvent])
			await expect(events[0]).toHaveText('load')
			await expect(events[1]).toHaveText('loadOk')

			// Expects the Play button to start the canvas animation
			await page.getByRole('button', {name: '✨ Play'}).click()

			// Expects the Player to enable available actions: Stop, Clear
			await expect(page.getByRole('button', {name: 'stop'})).toBeEnabled()
			await expect(page.getByRole('button', {name: 'clear'})).toBeEnabled()

			await expect(events[0]).toHaveText('loadOk')
			await expect(events[1]).toHaveText('play')

			// Expects the Pause button to pause the canvas animation
			await page.getByRole('button', {name: '🪷 Pause'}).click()
			events = await Promise.all([previousEvent, currentEvent])

			await expect(events[0]).toHaveText('play')
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
