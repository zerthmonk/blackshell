import { defineStore } from "pinia"
import { Config } from '~/models'
// import configData from "~/assets/config.json"

const configData = {};

const defaultLabels = {
    poweroff: '... power failure ...',
    login: '### blackshell login ###',
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

export type Menu = {
    title: string,
    type: string,
    content?: string,
    timer?: number,
    file?: string
}

export type User = {
    username: string,
    hackable: boolean,
    hacked: boolean,
    root: boolean,
    password: string,
    menu: Menu
}

export type RootState = {
    config: Config
    labels: Labels
    status?: string
    colorTheme?: string
};

export const useMainStore = defineStore('main', {
    persist: {
        enabled: true,
    },
    state: () =>
        ({
            config: configData,
            status: configData.status,
            colorTheme: configData.colorTheme || 'default',
            labels: configData.labels || defaultLabels,
            activeUser: '',
            users: [
                {
                    username: 'Toshiro Boon',
                    hackable: true,
                    hacked: false,
                    root: true,
                    password: 'letmein',
                    menu: [
                        {
                            'title': 'menu row one',
                            'type': 'text',
                            'content': 'this is text 1'
                        },
                        {
                            'title': 'menu row two',
                            'type': 'text',
                            'content': 'this is text 2'
                        },
                        {
                            'title': 'menu row three',
                            'type': 'text',
                            'content': 'this is text 3'
                        }
                    ]
                },
                {
                    username: 'Adam Jensen',
                    hackable: false,
                    hacked: false,
                    root: true,
                    password: '1K0q_#sz',
                    menu: {}
                },
                {
                    username: 'Johnny Flatline',
                    hackable: true,
                    hacked: false,
                    root: false,
                    password: 'dixi3fl4t',
                    menu: {}
                }
            ],
        } as RootState),

    actions: {
        setHacked(index) {
            const user = this.users[index]
            if (user.root) {
                this.users.forEach(u => u.hacked = true)
            } else {
                user.hacked = true;
            }
        },
        checkPassword(username, password) {
            const result = this.users.find(user => user.username === username && user.password === password)
            if (result) {
                this.activeUser = result.username
            }
        },
        logout() {
            this.activeUser = ''
            console.log('logged out')
        }
    },

    getters: {
        menu() {
            const result = this.users.find(user => user.username === this.activeUser) || {'menu': {}}
            return result.menu
        }
    }
});