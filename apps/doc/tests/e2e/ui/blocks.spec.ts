import {expect, test} from '@playwright/test'
import utils from '../../utils/constants'
import props from '../../utils/props.block'

const {ready} = utils.blocks
const path = utils.blocks.path()
let styleProps: string[] = []

test.describe.configure({mode: 'serial'})

// const components = [...ready, ...draft]

ready.forEach((component) => {
	test.describe(`${component} tests`, () => {
		test(`Doc has expected headings and content`, async ({page}) => {
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
			await page
				.getByTestId('context.menu.toggle.playbook')
				.click({force: true})
			await page.getByRole('heading', {level: 1, name: component})
		})

		test(`Playbook has working size input`, async ({page}) => {
			await page.goto(`${path}/${component}`)
			await page
				.getByTestId('context.menu.toggle.playbook')
				.click({force: true})

			if (styleProps.includes('size')) await props.testSize(page)
		})

		if (component !== 'Magic') {
			test(`Playbook has working color input`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				await page
					.getByTestId('context.menu.toggle.playbook')
					.click({force: true})

				if (styleProps.includes('color')) await props.testColor(page)
			})

			test(`Playbook has working variant input`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				styleProps = await page
					.getByTestId('doc-style-props')
					.getByRole('listitem')
					.allInnerTexts()
				await page
					.getByTestId('context.menu.toggle.playbook')
					.click({force: true})

				if (styleProps.includes('variant')) await props.testVariant(page)
			})
		}

		if (
			component !== 'Expand' &&
			component !== 'Switch' &&
			component !== 'InputRange' &&
			component !== 'Magic'
		) {
			test(`Playbook has working asset input [TODO: fix name]`, async ({
				page,
			}) => {
				await page.goto(`${path}/${component}`)
				await page
					.getByTestId('context.menu.toggle.playbook')
					.click({force: true})

				if (styleProps.includes('asset')) await props.testAsset(page)
			})
		}

		if (
			component === 'Button' ||
			component === 'Switch' ||
			component === 'Expand' ||
			component === 'Toggle'
		) {
			test(`Playbook has working shape input [TODO: fix name]`, async ({
				page,
			}) => {
				await page.goto(`${path}/${component}`)
				await page
					.getByTestId('context.menu.toggle.playbook')
					.click({force: true})

				if (styleProps.includes('shape')) await props.testShape(page)
			})
		}

		if (component === 'Feedback') {
			test(`Playbook has working context input`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				styleProps = await page
					.getByTestId('doc-style-props')
					.getByRole('listitem')
					.allInnerTexts()
				await page
					.getByTestId('context.menu.toggle.playbook')
					.click({force: true})

				if (styleProps.includes('context')) await props.testContext(page)
			})

			test(`Playbook has working status input`, async ({page}) => {
				await page.goto(`${path}/${component}`)
				styleProps = await page
					.getByTestId('doc-style-props')
					.getByRole('listitem')
					.allInnerTexts()
				await page
					.getByTestId('context.menu.toggle.playbook')
					.click({force: true})

				if (styleProps.includes('status')) await props.testStatus(page)
			})
		}
	})
})
