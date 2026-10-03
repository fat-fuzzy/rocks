export const matchInteger = (param: string): string | undefined => {
	if (/^\d+$/.test(param)) {
		return param
	}
}
