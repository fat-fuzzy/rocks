import type {Page} from '@playwright/test'
import test, {expect} from '@playwright/test'

const sizes = [
	{name: 'xl', value: '100'},
	{name: 'lg', value: '75'},
	{name: 'md', value: '50'},
	{name: 'sm', value: '25'},
	{name: 'xs', value: '0'},
]
async function testSize(page: Page, title: string) {
	await page.getByTestId('blocks.element.size').fill('100')
	await expect(page.getByLabel('size: xl')).toBeVisible()
	await expect(page.getByTestId(title)).toHaveClass(/size:xl/)
	await page.getByTestId('blocks.element.size').fill('75')
	await expect(page.getByLabel('size: lg')).toBeVisible()
	await expect(page.getByTestId(title)).toHaveClass(/size:lg/)
	await page.getByTestId('blocks.element.size').fill('50')
	await expect(page.getByLabel('size: md')).toBeVisible()
	await expect(page.getByTestId(title)).toHaveClass(/size:md/)
	await page.getByTestId('blocks.element.size').fill('25')
	await expect(page.getByLabel('size: sm')).toBeVisible()
	await expect(page.getByTestId(title)).toHaveClass(/size:sm/)
	await page.getByTestId('blocks.element.size').fill('0')
	await expect(page.getByLabel('size: xs')).toBeVisible()
	await expect(page.getByTestId(title)).toHaveClass(/size:xs/)
}

async function testContext(page: Page, title: string) {
	await page.getByTestId(`blocks.element.context.code`).click({force: true})
	await expect(page.getByTestId('blocks.element.context.code')).toBeChecked()
	await expect(page.getByTestId(title)).toHaveClass(/feedback:code/)
	await page.getByTestId(`blocks.element.context.prose`).click({force: true})
	await expect(page.getByTestId('blocks.element.context.prose')).toBeChecked()
	await expect(page.getByTestId(title)).toHaveClass(/feedback:prose/)
}

async function testStatus(page: Page, title: string) {
	await page.getByTestId(`blocks.element.status.info`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.info')).toBeChecked()
	await expect(page.getByTestId(title)).toHaveClass(/status:info/)
	await expect(page.getByTestId(title)).toHaveClass(/emoji:info/)
	await page.getByTestId(`blocks.element.status.success`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.success')).toBeChecked()
	await expect(page.getByTestId(title)).toHaveClass(/status:success/)
	await expect(page.getByTestId(title)).toHaveClass(/emoji:success/)
	await page.getByTestId(`blocks.element.status.warning`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.warning')).toBeChecked()
	await expect(page.getByTestId(title)).toHaveClass(/status:warning/)
	await expect(page.getByTestId(title)).toHaveClass(/emoji:warning/)
	await page.getByTestId(`blocks.element.status.error`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.error')).toBeChecked()
	await expect(page.getByTestId(title)).toHaveClass(/status:error/)
	await expect(page.getByTestId(title)).toHaveClass(/emoji:error/)
	await page.getByTestId(`blocks.element.status.default`).click({force: true})
	await expect(page.getByTestId('blocks.element.status.default')).toBeChecked()
	await expect(page.getByTestId(title)).toHaveClass(/status:default/)
	await expect(page.getByTestId(title)).toHaveClass(/emoji:default/)
}

async function testAsset(page: Page, title: string) {
	await page.getByTestId(`blocks.element.asset.profile`).click({force: true})
	await expect(
		page.getByTestId('blocks.element.asset.profile'),
	).toHaveAttribute('aria-pressed', 'true')
	await expect(page.getByTestId(title)).toHaveClass(/emoji:profile/)

	await page.getByTestId(`blocks.element.asset.favorite`).click({force: true})
	await expect(
		page.getByTestId('blocks.element.asset.favorite'),
	).toHaveAttribute('aria-pressed', 'true')
	await expect(page.getByTestId(title)).toHaveClass(/emoji:favorite/)

	await page.getByTestId(`blocks.element.asset.idea`).click({force: true})
	await expect(page.getByTestId('blocks.element.asset.idea')).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await expect(page.getByTestId(title)).toHaveClass(/emoji:idea/)

	await page.getByTestId(`blocks.element.asset.default`).click({force: true})
	await expect(
		page.getByTestId('blocks.element.asset.default'),
	).toHaveAttribute('aria-pressed', 'true')
	await expect(page.getByTestId(title)).toHaveClass(/emoji:default/)

	await page.getByTestId(`blocks.element.asset.default`).click({force: true})
	await expect(
		page.getByTestId('blocks.element.asset.default'),
	).toHaveAttribute('aria-pressed', 'false')
	await expect(page.getByTestId(title)).not.toHaveClass(/emoji:default/)
}

async function testShape(page: Page, title: string) {
	await page.getByTestId(`blocks.element.shape.round`).click({force: true})
	await expect(page.getByTestId('blocks.element.shape.round')).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await expect(page.getByTestId(title)).toHaveClass(/shape:round/)
	await page.getByTestId(`blocks.element.shape.square`).click({force: true})
	await expect(page.getByTestId('blocks.element.shape.square')).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await expect(page.getByTestId(title)).toHaveClass(/shape:square/)
}

async function testColor(page: Page, title: string) {
	await page.getByRole('button', {name: 'accent'}).click({force: true})
	await expect(page.getByRole('button', {name: 'accent'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await expect(page.getByTestId(title)).toHaveClass(/color:accent/)
	await page.getByRole('button', {name: 'primary'}).click({force: true})
	await expect(page.getByRole('button', {name: 'primary'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await expect(page.getByTestId(title)).toHaveClass(/color:primary/)
	await page.getByRole('button', {name: 'highlight'}).click({force: true})
	await expect(page.getByRole('button', {name: 'highlight'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await expect(page.getByTestId(title)).toHaveClass(/color:highlight/)
}

async function testVariant(page: Page, title: string) {
	await page.getByRole('button', {name: 'outline'}).click({force: true})
	await expect(page.getByRole('button', {name: 'outline'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await expect(page.getByTestId(title)).toHaveClass(/variant:outline/)
	await page.getByRole('button', {name: 'bare'}).click({force: true})
	await expect(page.getByRole('button', {name: 'bare'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await expect(page.getByTestId(title)).toHaveClass(/variant:bare/)
	await page.getByRole('button', {name: 'fill'}).click({force: true})
	await expect(page.getByRole('button', {name: 'fill'})).toHaveAttribute(
		'aria-pressed',
		'true',
	)
	await expect(page.getByTestId(title)).toHaveClass(/variant:fill/)
}

async function testStyleProps(page: Page, prop: string, title: string) {
	if (prop === 'size') {
		return testSize(page, title)
	} else if (prop === 'context') {
		return testContext(page, title)
	} else if (prop === 'status') {
		return testStatus(page, title)
	} else if (prop === 'color') {
		return testColor(page, title)
	} else if (prop === 'variant') {
		return testVariant(page, title)
	} else if (prop === 'asset') {
		return testAsset(page, title)
	} else if (prop === 'shape') {
		return testShape(page, title)
	} else {
		return Promise.resolve()
	}
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
