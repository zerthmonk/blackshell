interface Menu {
    type: string,
    text: string,
    timer?: number,
    value?: string,
    locked?: boolean
}

interface Mode {
    status: string,
    header?: string,
    footer?: string,
    menu?: Menu[]
}

interface Config {
    current: string,
    api_url?: Readonly<string>
    standalone: Readonly<boolean>,
    debug: Readonly<boolean>,
    modes: Record<string, Mode>,
}

interface ConsoleMessage {
    content: string,
    response?: boolean,
    time?: number
}

export {
    Menu,
    Mode,
    Config,
    ConsoleMessage
}