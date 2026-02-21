import {expect, test} from '@playwright/test'
import utils from '../../utils/constants'
import props from '../../utils/props.block'

const {ready} = utils.blocks
const path = utils.blocks.path()

test.describe.configure({mode: 'serial'})

// const components = [...ready, ...draft]

ready.forEach((component) => {
	test.describe(`${component} tests`, () => {
		test(`About page has expected headings and content`, async ({page}) => {
			await page.goto(`${path}/${component}`)
			styleProps = await page
				.getByTestId('doc-style-props')
				.getByRole('listitem')
				.allInnerTexts()
			await expect(
				page.getByRole('heading', {level: 1, name: component}),
			).toBeVisible()
			await expect(
				page.getByRole('heading', {level: 2, name: 'Usage'}),
			).toBeVisible()
			await expect(
				page.getByRole('heading', {level: 2, name: `Resources`}),
			).toBeVisible()
		})

		test(`Playbook page is accessible`, async ({page}) => {
			await page.goto(`${path}/${component}`)
			await page.getByRole('link', {name: 'Playbook'}).click()
			page.getByRole('heading', {level: 2, name: 'Playbook'}).isVisible()
		})

		test(`Playbook has working size input`, async ({page}) => {
			await page.goto(`${path}/${component}`)
			await page.getByRole('link', {name: 'Playbook'}).click()
			await props.testSize(page, component)
		})

		if (component !== 'Magic' && component !== 'Feedback') {
			test(`Playbook has working color input`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				await page.getByRole('link', {name: 'Playbook'}).click()
				await props.testColor(page, component)
			})
		}

		if (
			component !== 'Magic' &&
			component !== 'InputCheck' &&
			component !== 'InputRadio' &&
			component !== 'InputRange' &&
			component !== 'InputFile'
		) {
			test(`Playbook has working variant input`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				await page.getByRole('link', {name: 'Playbook'}).click()
				await props.testVariant(page, component)
			})
		}

		if (
			component !== 'Expand' &&
			component !== 'Switch' &&
			component !== 'InputRange' &&
			component !== 'InputFile' &&
			component !== 'Magic' &&
			component !== 'Feedback'
		) {
			test(`Playbook has working asset input: ${component}`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				await page.getByRole('link', {name: 'Playbook'}).click()
				await props.testAsset(page, component)
			})
		}

		if (
			component === 'Button' ||
			component === 'Switch' ||
			component === 'Expand' ||
			component === 'Toggle'
		) {
			test(`Playbook has working shape input ${component}`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				await page.getByRole('link', {name: 'Playbook'}).click()
				await props.testShape(page, component)
			})
		}

		if (component === 'Feedback') {
			test(`Playbook has working context input`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				styleProps = await page
					.getByTestId('doc-style-props')
					.getByRole('listitem')
					.allInnerTexts()
				await page.getByRole('link', {name: 'Playbook'}).click()
				await props.testContext(page, component)
			})

			test(`Playbook has working status input`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				styleProps = await page
					.getByTestId('doc-style-props')
					.getByRole('listitem')
					.allInnerTexts()
				await page.getByRole('link', {name: 'Playbook'}).click()
				await props.testStatus(page, component)
			})
		}
	})
})
