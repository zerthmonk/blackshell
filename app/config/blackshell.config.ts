interface Entity {
  id: string | number;
}

type CoreStatus = 'normal' | 'blocked' | 'off';
type AccessStatus = 'granted' | 'denied' | 'untouched';

interface Core {
  debug: boolean;
  standalone: boolean;
  apiUrl?: string;
  status: CoreStatus;
}

interface Hack extends Entity {
  power: number;
  time: number;
  status: AccessStatus;
}

interface Action extends Entity {
  label: string;
  hack?: Hack;
}

interface User extends Entity {
  username: string;
  password: string;
  isRoot: boolean;
  hack?: Hack;
  menu: Action[]
}

