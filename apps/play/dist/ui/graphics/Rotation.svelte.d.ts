import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        size?: string | undefined;
        label?: string | undefined;
        angle?: number | undefined;
        max?: number | undefined;
    };
    events: {
        input: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type RotationProps = typeof __propDef.props;
export type RotationEvents = typeof __propDef.events;
export type RotationSlots = typeof __propDef.slots;
export default class Rotation extends SvelteComponent<RotationProps, RotationEvents, RotationSlots> {
}
export {};
