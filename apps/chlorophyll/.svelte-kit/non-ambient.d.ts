
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/cv" | "/cv/[page=cta]";
		RouteParams(): {
			"/cv/[page=cta]": { page: MatcherParam<typeof import('../src/params/cta.js').match> }
		};
		LayoutParams(): {
			"/": { page?: MatcherParam<typeof import('../src/params/cta.js').match> | undefined };
			"/cv": { page?: MatcherParam<typeof import('../src/params/cta.js').match> | undefined };
			"/cv/[page=cta]": { page: MatcherParam<typeof import('../src/params/cta.js').match> }
		};
		Pathname(): "/" | "/cv" | `/cv/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/chlorophyll.webmanifest" | "/favicon.png" | "/fonts/woff/Anonymous_Pro/AnonymousPro-Bold.woff" | "/fonts/woff/Anonymous_Pro/AnonymousPro-Bold.woff2" | "/fonts/woff/Anonymous_Pro/AnonymousPro-BoldItalic.woff" | "/fonts/woff/Anonymous_Pro/AnonymousPro-BoldItalic.woff2" | "/fonts/woff/Anonymous_Pro/AnonymousPro-Italic.woff" | "/fonts/woff/Anonymous_Pro/AnonymousPro-Italic.woff2" | "/fonts/woff/Anonymous_Pro/AnonymousPro-Regular.woff" | "/fonts/woff/Anonymous_Pro/AnonymousPro-Regular.woff2" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Black.woff" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Black.woff2" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Bold.woff" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Bold.woff2" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-ExtraBold.woff" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-ExtraBold.woff2" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-ExtraLight.woff" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-ExtraLight.woff2" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Light.woff" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Light.woff2" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Medium.woff" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Medium.woff2" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Regular.woff" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Regular.woff2" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-SemiBold.woff" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-SemiBold.woff2" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Thin.woff" | "/fonts/woff/Encode_Sans_SC/EncodeSansSC-Thin.woff2" | "/fonts/woff/Montserrat/Montserrat-Black.woff" | "/fonts/woff/Montserrat/Montserrat-Black.woff2" | "/fonts/woff/Montserrat/Montserrat-BlackItalic.woff" | "/fonts/woff/Montserrat/Montserrat-BlackItalic.woff2" | "/fonts/woff/Montserrat/Montserrat-Bold.woff" | "/fonts/woff/Montserrat/Montserrat-Bold.woff2" | "/fonts/woff/Montserrat/Montserrat-BoldItalic.woff" | "/fonts/woff/Montserrat/Montserrat-BoldItalic.woff2" | "/fonts/woff/Montserrat/Montserrat-ExtraBold.woff" | "/fonts/woff/Montserrat/Montserrat-ExtraBold.woff2" | "/fonts/woff/Montserrat/Montserrat-ExtraBoldItalic.woff" | "/fonts/woff/Montserrat/Montserrat-ExtraBoldItalic.woff2" | "/fonts/woff/Montserrat/Montserrat-ExtraLight.woff" | "/fonts/woff/Montserrat/Montserrat-ExtraLight.woff2" | "/fonts/woff/Montserrat/Montserrat-ExtraLightItalic.woff" | "/fonts/woff/Montserrat/Montserrat-ExtraLightItalic.woff2" | "/fonts/woff/Montserrat/Montserrat-Italic.woff" | "/fonts/woff/Montserrat/Montserrat-Italic.woff2" | "/fonts/woff/Montserrat/Montserrat-Light.woff" | "/fonts/woff/Montserrat/Montserrat-Light.woff2" | "/fonts/woff/Montserrat/Montserrat-LightItalic.woff" | "/fonts/woff/Montserrat/Montserrat-LightItalic.woff2" | "/fonts/woff/Montserrat/Montserrat-Medium.woff" | "/fonts/woff/Montserrat/Montserrat-Medium.woff2" | "/fonts/woff/Montserrat/Montserrat-MediumItalic.woff" | "/fonts/woff/Montserrat/Montserrat-MediumItalic.woff2" | "/fonts/woff/Montserrat/Montserrat-Regular.woff" | "/fonts/woff/Montserrat/Montserrat-Regular.woff2" | "/fonts/woff/Montserrat/Montserrat-SemiBold.woff" | "/fonts/woff/Montserrat/Montserrat-SemiBold.woff2" | "/fonts/woff/Montserrat/Montserrat-SemiBoldItalic.woff" | "/fonts/woff/Montserrat/Montserrat-SemiBoldItalic.woff2" | "/fonts/woff/Montserrat/Montserrat-Thin.woff" | "/fonts/woff/Montserrat/Montserrat-Thin.woff2" | "/fonts/woff/Montserrat/Montserrat-ThinItalic.woff" | "/fonts/woff/Montserrat/Montserrat-ThinItalic.woff2" | "/icons/README.md" | "/icons/arrow-bar-down.svg" | "/icons/arrow-bar-up.svg" | "/icons/check.svg" | "/icons/chevron-down.svg" | "/icons/chevron-right.svg" | "/icons/copy.svg" | "/icons/cross.svg" | "/icons/dash.svg" | "/icons/github.svg" | "/icons/herb.svg" | "/icons/list-ol.svg" | "/icons/list-ul.svg" | "/icons/lock.svg" | "/icons/lotus.svg" | "/icons/memo.svg" | "/icons/plus.svg" | "/icons/save.svg" | "/icons/type-bold.svg" | "/icons/type-h1.svg" | "/icons/type-h2.svg" | "/icons/type-h3.svg" | "/icons/type-h4.svg" | "/icons/type-h5.svg" | "/icons/type-italic.svg" | "/icons/type-strikethrough.svg" | "/icons/type-underline.svg" | "/icons/type.svg" | "/icons/unlock.svg" | "/pwa/icons/1024.png" | "/pwa/icons/192.png" | "/pwa/icons/512.png" | "/pwa/images/edit-600-1000.png" | "/pwa/images/edit-800-440.png" | "/robots.txt" | string & {};
	}
}