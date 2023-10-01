import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type WeatherForecatProps = typeof __propDef.props;
export type WeatherForecatEvents = typeof __propDef.events;
export type WeatherForecatSlots = typeof __propDef.slots;
export default class WeatherForecat extends SvelteComponent<WeatherForecatProps, WeatherForecatEvents, WeatherForecatSlots> {
}
export {};
