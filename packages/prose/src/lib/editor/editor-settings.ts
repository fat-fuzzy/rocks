import StarterKit from '@tiptap/starter-kit'
import {TextStyleKit} from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'

const extensions = [
	StarterKit,
	TextStyleKit,
	Link.extend({name: 'customLink'}).configure({
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

				// disallowed domains
				const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
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
	}),
]

export default {
	extensions,
}
