import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        canvas: HTMLCanvasElement;
        sketch: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PlayerProps = typeof __propDef.props;
export type PlayerEvents = typeof __propDef.events;
export type PlayerSlots = typeof __propDef.slots;
export default class Player extends SvelteComponent<PlayerProps, PlayerEvents, PlayerSlots> {
}
export {};
