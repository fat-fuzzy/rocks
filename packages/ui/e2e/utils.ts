import format from '../dist/utils/format'

export function getLabels(prop) {
	if (!prop.items) {
		return
	}
	return prop.items.map((item) => format.formatLabel(item.title, item.asset)).join(' ')
}

export function getLabelsRecursive(prop) {
	const linkLabels = getLabels(prop)
	if (!linkLabels) {
		return
	}
	return prop.items.reduce(
		(accLabels, item) => {
			const subLabels = getLabels(item)
			if (subLabels) {
				accLabels.concat(subLabels)
			}
			return accLabels
		},
		[`${prop.title} ${linkLabels}`],
	)
}
