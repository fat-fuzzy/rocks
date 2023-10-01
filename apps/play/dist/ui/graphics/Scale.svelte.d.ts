import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        size?: string | undefined;
        scaleX?: number | undefined;
        scaleY?: number | undefined;
        minX?: number | undefined;
        maxX?: number | undefined;
        minY?: number | undefined;
        maxY?: number | undefined;
        label?: string | undefined;
    };
    events: {
        input: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ScaleProps = typeof __propDef.props;
export type ScaleEvents = typeof __propDef.events;
export type ScaleSlots = typeof __propDef.slots;
export default class Scale extends SvelteComponent<ScaleProps, ScaleEvents, ScaleSlots> {
}
export {};
