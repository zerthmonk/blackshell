import { defineStore } from "pinia"

interface ConsoleEvent {
    userid: string | number;
    timestamp: number;
    message: string;
    response: boolean;
}

interface RootState {
    consoleEvents: ConsoleEvent[];
};

type createEventProps = Partial<ConsoleEvent> & Pick<ConsoleEvent, "message">;


export const useConsoleStore = defineStore('console', {
    state: () =>
        ({
            consoleEvents: [],
        } as RootState),

    actions: {
        clean() {
            this.$state.consoleEvents = [];
        },
        create(props: createEventProps) {
            const event: ConsoleEvent = {
                message: props.message,
                userid: props.userid || 'root',
                timestamp: props?.timestamp || Date.now(),
                response: props?.response || false
            }
            this.$state.consoleEvents = [...this.$state.consoleEvents, event];
        }
    },
});
