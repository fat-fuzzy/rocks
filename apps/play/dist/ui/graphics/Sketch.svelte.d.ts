import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        sketch: any;
        title: string;
        dimensions: string;
        layer?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SketchProps = typeof __propDef.props;
export type SketchEvents = typeof __propDef.events;
export type SketchSlots = typeof __propDef.slots;
export default class Sketch extends SvelteComponent<SketchProps, SketchEvents, SketchSlots> {
}
export {};
