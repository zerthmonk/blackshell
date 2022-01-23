import { defineStore } from "pinia"
import { Config } from '@/models'
import configData from "@/assets/config.json"

export type RootState = {
    config: Config
};

export const useShellStore = defineStore('shell', {
    state: () =>
        ({
            config: configData,
        } as RootState),

    actions: {
    },
});