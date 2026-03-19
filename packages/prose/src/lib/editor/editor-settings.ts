import {Mark, mergeAttributes} from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import {TextStyleKit} from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		semibold: {
			toggleSemiBold: () => ReturnType
		}
	}
}

const SemiBold = Mark.create({
	name: 'semibold',
	addOptions() {
		return {class: 'font:semibold'}
	},

	addAttributes() {
		return {
			class: {
				default: null,
				parseHTML: (element) =>
					element.className.includes(this.options.class)
						? this.options.class
						: null,
				renderHTML: (attributes) => ({
					class: attributes.class ?? this.options.class,
				}),
			},
		}
	},

	parseHTML() {
		return [
			{
				tag: `[class*="${this.options.class}"]`,
			},
		]
	},

	renderHTML({HTMLAttributes}) {
		return ['span', mergeAttributes(HTMLAttributes), 0]
	},

	addCommands() {
		return {
			toggleSemiBold:
				() =>
				({commands}) => {
					// Remove bold before toggling semibold
					commands.unsetMark('bold')
					return commands.toggleMark(this.name)
				},
		}
	},
})

const CustomBold = Bold.extend({
	addCommands() {
		return {
			toggleBold:
				() =>
				({commands}) => {
					// Remove semibold before toggling bold
					commands.unsetMark('semibold')
					return commands.toggleMark(this.name)
				},
		}
	},
})

const CustomLink = Link.extend({name: 'customLink'}).configure({
	openOnClick: false,
	autolink: true,
	defaultProtocol: 'https',
	protocols: ['http', 'https'],
	isAllowedUri: (url, ctx) => {
		try {
			// construct URL
			const parsedUrl = url.includes(':')
				? new URL(url)
				: new URL(`${ctx.defaultProtocol}://${url}`)

			// use default validation
			if (!ctx.defaultValidate(parsedUrl.href)) {
				return false
			}

			// disallowed protocols
			const disallowedProtocols = ['ftp', 'file', 'mailto']
			const protocol = parsedUrl.protocol.replace(':', '')

			if (disallowedProtocols.includes(protocol)) {
				return false
			}

			// only allow protocols specified in ctx.protocols
			const allowedProtocols = ctx.protocols.map((p) =>
				typeof p === 'string' ? p : p.scheme,
			)

			if (!allowedProtocols.includes(protocol)) {
				return false
			}

			// disallowed domains: this is your own text, maybe whitelist instead ?
			const disallowedDomains: string[] = []
			const domain = parsedUrl.hostname

			if (disallowedDomains.includes(domain)) {
				return false
			}

			// all checks have passed
			return true
		} catch {
			return false
		}
	},
	shouldAutoLink: (url) => {
		try {
			// construct URL
			const parsedUrl = url.includes(':')
				? new URL(url)
				: new URL(`https://${url}`)

			// only auto-link if the domain is not in the disallowed list
			const disallowedDomains = [
				'example-no-autolink.com',
				'another-no-autolink.com',
			]
			const domain = parsedUrl.hostname

			return !disallowedDomains.includes(domain)
		} catch {
			return false
		}
	},
})

const extensions = [StarterKit, TextStyleKit, SemiBold, CustomBold, CustomLink]

export default {
	extensions,
}
