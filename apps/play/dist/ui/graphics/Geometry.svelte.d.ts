import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        canvasWidth: number;
        canvasHeight: number;
        geometry: any;
    };
    events: {
        update: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type GeometryProps = typeof __propDef.props;
export type GeometryEvents = typeof __propDef.events;
export type GeometrySlots = typeof __propDef.slots;
export default class Geometry extends SvelteComponent<GeometryProps, GeometryEvents, GeometrySlots> {
}
export {};
