import {expect, test} from '@playwright/test'
import utils from '../../utils/constants'

const {draft} = utils.blocks
const path = utils.blocks.path()

draft.forEach((component) => {
	test(`${component} page has expected headings and content`, async ({
		page,
	}) => {
		await page.goto(`${path}/${component}`)
		await expect(page.getByText('404: Not Found')).toBeVisible()
		await expect(page.getByText('Not found')).toBeVisible()
	})
})
