import {expect, test} from '@playwright/test'

test('Player loads in idle state', async ({page}) => {
	await page.goto('/random-rect')
	
	// Expects the Player to enable the available action: Play
	await expect(page.getByRole('button', {name: 'play'})).toBeEnabled()
	// Expects the Player to disable unavailable actions: Stop, Clear
	await expect(page.getByRole('button', {name: 'stop'})).toBeDisabled()
	await expect(page.getByRole('button', {name: 'clear'})).toBeDisabled()
})
