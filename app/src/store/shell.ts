import { defineStore } from "pinia"
import { ConsoleEvent } from "@/models";

export type RootState = {
    consoleEvents: ConsoleEvent[]
};

export const useShellStore = defineStore('shell', {
    state: () =>
        ({
            consoleEvents: [],
        } as RootState),

    actions: {
    },
});
