export type MediaProps = {
	id?: string
	slug?: string
	src: string
	ext: string
	alt: string
	width: string
	height: string
	title?: string
	caption?: string
	overlay?: boolean
	orientation?: 'landscape' | 'portrait'
	loading?: 'lazy' | 'eager'
	dimensions?: string
	sources: {width: string; height: string; format: string}[]
	sizes: {query?: string; slot: string}[]
}

export type PictureProps = MediaProps & {
	media: {query?: string; srcset: {width: string; dpr: number}[]}[]
}
