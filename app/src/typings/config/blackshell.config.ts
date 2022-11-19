export interface Entity {
  id: string | number;
}

export type CoreStatus = "normal" | "blocked" | "off";
export type AccessStatus = "granted" | "denied" | "untouched";

export interface Core {
  debug: boolean;
  standalone: boolean;
  apiUrl?: string;
  status: CoreStatus;
}

export interface Hack extends Entity {
  power: number;
  time: number;
  status: AccessStatus;
}

export interface Action extends Entity {
  label: string;
  hack?: Hack;
}

export interface User extends Entity {
  username: string;
  password: string;
  isRoot: boolean;
  hack?: Hack;
  menu: Action[];
}
