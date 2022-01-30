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
                { username: 'Toshiro Boon', hackable: true, hacked: false, root: false, password: 'letmein' },
                { username: 'Adam Jensen', hackable: false, hacked: false, root: true, password: '1K0q_#sz' },
                { username: 'Johnny Flatline', hackable: true, hacked: false, root: false, password: 'dixi3fl4t' }
            ]
        } as RootState),

    actions: {
        setHacked(index) {
            const user = this.users[index]
            if (user.root) {
                this.users.forEach(u => u.hacked = true)
            } else {
                user.hacked = true;
            }
        }
    },
});