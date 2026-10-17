import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest'

import * as downloadModule from '#lib/common/download.js'

const {generateDownload, guardedExport} = downloadModule

describe('download.ts - browser download helpers', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date('2026-10-17T00:00:00.000Z'))
		vi.stubGlobal('window', {})
		vi.stubGlobal('document', {createElement: vi.fn()})
	})

	afterEach(() => {
		vi.restoreAllMocks()
		vi.unstubAllGlobals()
		vi.useRealTimers()
	})

	describe('generateDownload', () => {
		test('uses the browser save picker when it is available', async () => {
			const write = vi.fn().mockResolvedValue(undefined)
			const close = vi.fn().mockResolvedValue(undefined)
			const handle = {createWritable: vi.fn().mockResolvedValue({write, close})}
			const picker = vi.fn().mockResolvedValue(handle)

			// eslint-disable-next-line
			;(globalThis as any).window.showSaveFilePicker = picker

			await generateDownload({
				root: 'chlorophyll',
				filename: 'backup',
				data: JSON.stringify({ok: true}),
				mimeType: 'application/json',
			})

			await vi.waitFor(() => {
				expect(picker).toHaveBeenCalledWith({
					suggestedName: 'chlorophyll-backup-2026-10-17',
					types: [
						{
							description: 'JSON file',
							accept: {'application/json': ['.json']},
						},
					],
				})
			})

			expect(handle.createWritable).toHaveBeenCalledTimes(1)
			expect(write).toHaveBeenCalledTimes(1)
			expect(write.mock.calls[0][0]).toBeInstanceOf(Blob)
			expect(write.mock.calls[0][0].type).toBe('application/json')
			await vi.waitFor(() => expect(close).toHaveBeenCalledTimes(1))
		})

		test('falls back to an anchor click when the picker is unavailable', async () => {
			// eslint-disable-next-line
			delete (globalThis as any).window.showSaveFilePicker

			const anchor = {
				href: '',
				download: '',
				click: vi.fn(),
			} as unknown as HTMLAnchorElement
			vi.spyOn(globalThis.document, 'createElement').mockReturnValue(
				// eslint-disable-next-line
				anchor as any,
			)
			vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
			vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})

			await generateDownload({
				root: 'mycelium',
				filename: 'fallback',
				data: JSON.stringify({ok: true}),
				mimeType: 'application/json',
			})

			expect(URL.createObjectURL).toHaveBeenCalledTimes(1)
			expect(anchor.download).toBe('mycelium-fallback-2026-10-17')
			expect(anchor.click).toHaveBeenCalledTimes(1)
			expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
		})

		test('uses default root and backup fallback when filename is omitted', async () => {
			// eslint-disable-next-line
			delete (globalThis as any).window.showSaveFilePicker

			const anchor = {
				href: '',
				download: '',
				click: vi.fn(),
			} as unknown as HTMLAnchorElement
			vi.spyOn(globalThis.document, 'createElement').mockReturnValue(
				// eslint-disable-next-line
				anchor as any,
			)
			vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
			vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})

			await generateDownload({
				data: JSON.stringify({ok: true}),
			})

			expect(anchor.download).toBe('vital-backup-2026-10-17')
			expect(anchor.click).toHaveBeenCalledTimes(1)
		})
	})

	describe('guardedExport', () => {
		test('is a no-op when the payload is effectively empty', async () => {
			const picker = vi.fn()
			// eslint-disable-next-line
			;(globalThis as any).window.showSaveFilePicker = picker
			vi.spyOn(globalThis.document, 'createElement')

			await guardedExport({
				filename: 'backup',
				data: JSON.stringify({content: {}, presets: []}),
			})

			expect(picker).not.toHaveBeenCalled()
			expect(globalThis.document.createElement).not.toHaveBeenCalled()
		})

		test('triggers a download for real payloads and applies a date-stamped filename', async () => {
			const write = vi.fn().mockResolvedValue(undefined)
			const close = vi.fn().mockResolvedValue(undefined)
			const handle = {createWritable: vi.fn().mockResolvedValue({write, close})}
			const picker = vi.fn().mockResolvedValue(handle)
			// eslint-disable-next-line
			;(globalThis as any).window.showSaveFilePicker = picker
			const payload = JSON.stringify({
				content: {doc: 'hello'},
				presets: [{name: 'default'}],
			})

			await guardedExport({
				root: 'vital',
				filename: 'backup',
				data: payload,
			})

			await vi.waitFor(() =>
				expect(picker).toHaveBeenCalledWith({
					suggestedName: 'vital-backup-2026-10-17',
					types: [
						{
							description: 'JSON file',
							accept: {'application/json': ['.json']},
						},
					],
				}),
			)
			expect(handle.createWritable).toHaveBeenCalledTimes(1)
			await vi.waitFor(() => expect(close).toHaveBeenCalledTimes(1))
		})

		test('rejects invalid JSON instead of silently exporting garbage', async () => {
			await expect(
				guardedExport({
					filename: 'backup',
					data: '{not-valid-json',
				}),
			).rejects.toThrow(SyntaxError)
		})
	})
})
