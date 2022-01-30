import { defineStore } from "pinia"
import { Config } from '@/models'
import configData from "@/assets/config.json"

const defaultLabels = {
    poweroff: '... power failure ...',
    login: 'blackshell login',
    loginLabel: 'auth routine initiated...',
    blocked: 'terminal blocked',
    header: 'user authorized',
    footer: 'blackshell VT40k'
}

export type Labels = {
    poweroff: string,
    login: string,
    blocked: string,
    header: string,
    footer: string
}

export type RootState = {
    config: Config
    labels: Labels
    status?: string
    colorTheme?: string
};

export const useMainStore = defineStore('main', {
    state: () =>
        ({
            config: configData,
            status: configData.status,
            colorTheme: configData.colorTheme || 'default',
            labels: configData.labels || defaultLabels,
            users: [
                { username: 'Toshiro Boon', hackable: true, },
                { username: 'Adam Jensen', hackable: false },
                { username: 'Johnny Flatline', hackable: false }
            ]
        } as RootState),

    actions: {
    },
});