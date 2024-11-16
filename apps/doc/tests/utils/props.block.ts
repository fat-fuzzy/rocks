import type {Page} from '@playwright/test'
import test, {expect} from '@playwright/test'

async function testSize(page: Page) {
	await page.getByTestId('blocks.element.size').fill('100')
	await expect(page.getByLabel('size: xl')).toBeVisible()
	await page.getByTestId('blocks.element.size').fill('75')
	await expect(page.getByLabel('size: lg')).toBeVisible()
	await page.getByTestId('blocks.element.size').fill('50')
	await expect(page.getByLabel('size: md')).toBeVisible()
	await page.getByTestId('blocks.element.size').fill('25')
	await expect(page.getByLabel('size: sm')).toBeVisible()
	await page.getByTestId('blocks.element.size').fill('0')
	await expect(page.getByLabel('size: xs')).toBeVisible()
}

async function testContext(page: Page) {
	await page.getByTestId(`blocks.element.context.code`).click({force: true})
	await expect(page.getByTestId('blocks.element.context.code')).toBeChecked()
	await page.getByTestId(`blocks.element.context.prose`).click({force: true})
	await expect(page.getByTestId('blocks.element.context.prose')).toBeChecked()
}

async function testStatus(page: Page) {
	await page.getByTestId(`blocks.element.status.info`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.info')).toBeChecked()
	await page.getByTestId(`blocks.element.status.success`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.success')).toBeChecked()
	await page.getByTestId(`blocks.element.status.warning`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.warning')).toBeChecked()
	await page.getByTestId(`blocks.element.status.error`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.error')).toBeChecked()
	await page.getByTestId(`blocks.element.status.default`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.default')).toBeChecked()
}

async function testAsset(page: Page) {
	await page.getByTestId(`blocks.element.asset.profile`).click({force: true})
	await expect(
		page.getByTestId('blocks.element.asset.profile'),
	).toHaveAttribute('aria-pressed', 'true')
	await page.getByTestId(`blocks.element.asset.favorite`).click({force: true})
	await expect(
		page.getByTestId('blocks.element.asset.favorite'),
	).toHaveAttribute('aria-pressed', 'true')
	await page.getByTestId(`blocks.element.asset.idea`).click({force: true})
	await expect(page.getByTestId('blocks.element.asset.idea')).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await page.getByTestId(`blocks.element.asset.default`).click({force: true})
	await expect(
		page.getByTestId('blocks.element.asset.default'),
	).toHaveAttribute('aria-pressed', 'true')
}

async function testShape(page: Page) {
	await page.getByTestId(`blocks.element.shape.round`).click({force: true})
	await expect(page.getByTestId('blocks.element.shape.round')).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await page.getByTestId(`blocks.element.shape.square`).click({force: true})
	await expect(page.getByTestId('blocks.element.shape.square')).toHaveAttribute(
		'aria-pressed',
		'true',
	)
}

async function testColor(page: Page) {
	await page.getByRole('button', {name: 'primary'}).click({force: true})
	await expect(page.getByRole('button', {name: 'primary'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await page.getByRole('button', {name: 'accent'}).click({force: true})
	await expect(page.getByRole('button', {name: 'accent'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await page.getByRole('button', {name: 'highlight'}).click({force: true})
	await expect(page.getByRole('button', {name: 'highlight'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
}

async function testVariant(page: Page) {
	await page.getByRole('button', {name: 'outline'}).click({force: true})
	await expect(page.getByRole('button', {name: 'outline'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await page.getByRole('button', {name: 'bare'}).click({force: true})
	await expect(page.getByRole('button', {name: 'bare'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await page.getByRole('button', {name: 'fill'}).click({force: true})
	await expect(page.getByRole('button', {name: 'fill'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
}

async function testStyleProps(page: Page, styleProps: string[]) {
	const stylePromises = styleProps.map(async (prop) => {
		if (prop === 'size') {
			return testSize(page)
		} else if (prop === 'context') {
			return testContext(page)
		} else if (prop === 'status') {
			return testStatus(page)
		} else if (prop === 'color') {
			return testColor(page)
		} else if (prop === 'variant') {
			return testVariant(page)
		} else if (prop === 'asset') {
			return testAsset(page)
		} else if (prop === 'shape') {
			return testShape(page)
		} else {
			return Promise.resolve()
		}
	})

	await Promise.all(stylePromises)
	return Promise.resolve()
}

export default {
	testSize,
	testContext,
	testStatus,
	testColor,
	testVariant,
	testAsset,
	testShape,
	testStyleProps,
}
