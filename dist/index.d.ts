import { App } from 'vue';
import { Ref } from 'vue';

declare type Breakpoints = {
	[key: string]: number;
};

export declare const breakpoints: {
	install(app: App, options?: PluginInstallOptions): void;
};

export declare type EventPayload = Event & {
	payload?: {
		breakpoint: string;
		breakpointWidth: number;
		screen: string;
		screenWidth: number;
		orientation: "portrait" | "landscape" | "square" | null;
		width: number;
		height: number;
	};
};

declare type HookReturnValue = HookState & {
	breakpoints: Breakpoints;
	screens: Breakpoints;
};

declare type HookState = {
	breakpoint: Ref<string>;
	screen: Ref<string>;
	width: Ref<number>;
	height: Ref<number>;
	breakpointWidth: Ref<Breakpoints[keyof Breakpoints]>;
	screenWidth: Ref<Breakpoints[keyof Breakpoints]>;
	orientation: Ref<Orientation>;
	is: Ref<{
		[key: keyof Breakpoints]: boolean;
	}>;
	event: Ref<Event>;
};

declare type Orientation = "portrait" | "landscape" | "square" | null;

declare type PluginInstallOptions = {
	breakpoints?: Breakpoints;
	screens?: Breakpoints;
	override?: {
		breakpoint?: boolean;
		screen?: boolean;
	};
};

export declare function useBreakpoints(): HookReturnValue;

export { }
