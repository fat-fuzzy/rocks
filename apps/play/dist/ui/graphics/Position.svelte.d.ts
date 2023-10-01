import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        size?: string | undefined;
        coordX?: number | undefined;
        coordY?: number | undefined;
        maxX?: number | undefined;
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
export type PositionProps = typeof __propDef.props;
export type PositionEvents = typeof __propDef.events;
export type PositionSlots = typeof __propDef.slots;
export default class Position extends SvelteComponent<PositionProps, PositionEvents, PositionSlots> {
}
export {};
