import { App } from 'vue';
import { ToRefs } from 'vue';

declare type Breakpoints = {
    [key: string]: number;
};

export declare const breakpoints: {
    install(app: App, options: PluginInstallOptions): void;
};

declare type PluginInstallOptions = Breakpoints;

export declare function useBreakpoints(options?: PluginInstallOptions): ToRefs<    {
breakpoint: string | number | null;
width: number;
height: number;
breakpointWidth: number;
orientation: "portrait" | "landscape" | "square" | null;
}>;

export { }
